// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

/// @title BitbybitBond
/// @notice Simplified non-upgradable 8‑month USDC lock contract.
///         Integrations with ICHI, Aave, Chainlink, and charity rails are mocked for MVP.
contract BitbybitBond {
    struct Position {
        uint256 amount;
        uint256 start;
        uint256 unlock;
        uint8 charityId;
        bool redeemed;
    }

    IERC20 public immutable usdc;
    uint256 public constant LOCK_DURATION = 240 days; // ~8 months

    // Mock addresses for integrations – in a real deployment these would be
    // ICHI vaults, Aave pool, Chainlink feeds, and charity rails.
    address public immutable ichiVault;
    address public immutable aavePool;
    address public immutable chainlinkOracle;

    mapping(address => Position) public positions;

    event Locked(address indexed donor, uint256 amount, uint8 charityId, uint256 unlockTime);
    event Redeemed(address indexed donor, uint256 principalReturned, uint256 donatedYield, uint8 charityId);
    event ReceiptIssued(address indexed donor, uint8 indexed charityId, uint256 fmv);

    constructor(address _usdc, address _ichiVault, address _aavePool, address _chainlinkOracle) {
        require(_usdc != address(0), "usdc required");
        usdc = IERC20(_usdc);
        ichiVault = _ichiVault;
        aavePool = _aavePool;
        chainlinkOracle = _chainlinkOracle;
    }

    /// @notice Lock USDC for 8 months for a specific charity.
    /// @dev For MVP, this simply records the position and assumes yield is realized on redeem.
    function lock(uint256 amount, uint8 charityId) external {
        require(amount > 0, "amount > 0");
        Position storage p = positions[msg.sender];
        require(p.amount == 0 || p.redeemed, "existing position");

        // Pull USDC into this contract. In a production setting this would
        // then be deposited into ICHI / Aave.
        require(usdc.transferFrom(msg.sender, address(this), amount), "transferFrom failed");

        uint256 startTime = block.timestamp;
        uint256 unlockTime = startTime + LOCK_DURATION;

        positions[msg.sender] = Position({
            amount: amount,
            start: startTime,
            unlock: unlockTime,
            charityId: charityId,
            redeemed: false
        });

        emit Locked(msg.sender, amount, charityId, unlockTime);
    }

    /// @notice Redeem after lock period. Principal returned to donor, yield sent to charity.
    /// @dev Yield and FMV are mocked for MVP; external calls to Aave/ICHI/Chainlink
    ///      would be wired here in a production deployment.
    function redeem(uint256 mockYieldAmount, uint256 mockFmv) external {
        Position storage p = positions[msg.sender];
        require(p.amount > 0, "no position");
        require(!p.redeemed, "already redeemed");
        require(block.timestamp >= p.unlock, "not unlocked");

        p.redeemed = true;

        // In production: withdraw from ICHI/Aave, calculate real yield.
        uint256 principal = p.amount;
        uint256 yieldAmount = mockYieldAmount;

        // Principal back to donor.
        require(usdc.transfer(msg.sender, principal), "principal transfer failed");

        // Yield to charity rail (mocked as zero address sink for MVP).
        if (yieldAmount > 0) {
            require(usdc.transfer(address(0), yieldAmount), "yield transfer failed");
        }

        emit Redeemed(msg.sender, principal, yieldAmount, p.charityId);
        emit ReceiptIssued(msg.sender, p.charityId, mockFmv);
    }

    function getPosition(address donor) external view returns (Position memory) {
        return positions[donor];
    }
}
