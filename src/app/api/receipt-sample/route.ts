export async function GET() {
  const content =
    "Sample Bitbybit tax receipt\n\n" +
    "Donor: Example Donor\n" +
    "Charity: Example Canadian Charity (CRA-registered)\n" +
    "Principal: $10,000 CAD\n" +
    "Actual growth: $847 CAD\n" +
    "Total receipted amount: $10,847 CAD\n" +
    "\nThis sample is for demonstration purposes only.";

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=bitbybit-sample-receipt.pdf",
    },
  });
}
