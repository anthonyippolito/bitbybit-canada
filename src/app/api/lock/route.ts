import { NextResponse } from "next/server";
import { ethers } from "ethers";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as
    | { amount?: number; charityId?: number }
    | null;

  const amount = body?.amount;
  const charityId = body?.charityId;

  if (!amount || !charityId) {
    return NextResponse.json({ error: "Missing amount or charityId" }, { status: 400 });
  }

  const rpcUrl = process.env.NEXT_PUBLIC_POLYGON_RPC_URL;
  const contractAddress = process.env.NEXT_PUBLIC_BITBYBIT_CONTRACT_ADDRESS;

  if (!rpcUrl || !contractAddress) {
    return NextResponse.json(
      {
        success: true,
        mode: "mock",
        lockId: "demo-lock",
      },
      { status: 200 },
    );
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const relayerKey = process.env.BITBYBIT_RELAYER_PRIVATE_KEY;

  if (!relayerKey) {
    return NextResponse.json(
      {
        success: true,
        mode: "mock",
        lockId: "demo-lock",
      },
      { status: 200 },
    );
  }

  const wallet = new ethers.Wallet(relayerKey, provider);
  const abi = ["function lock(uint256 amount, uint8 charityId) external"];
  const contract = new ethers.Contract(contractAddress, abi, wallet);

  try {
    const decimals = 6;
    const scaled = ethers.parseUnits(amount.toString(), decimals);
    const tx = await contract.lock(scaled, charityId);
    const receipt = await tx.wait();

    return NextResponse.json(
      {
        success: true,
        mode: "onchain",
        transactionHash: receipt?.hash ?? tx.hash,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to send lock transaction",
      },
      { status: 500 },
    );
  }
}
