import { useState } from "react";

export default function Checkout() {
  const [upiId, setUpiId] = useState("");

  const handlePayment = async () => {
    const res = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ upiId }),
    });

    const data = await res.json();

    const options = {
      key: data.key,
      subscription_id: data.subscriptionId,
      name: "RecurPay",
      description: "Premium Plan",
      prefill: {
        email: data.email,
        contact: data.contact,
      },
      method: {
        upi: true,
      },
      handler: function (response: any) {
        console.log(response);
        alert("Payment Successful");
      },
    };

    const razor = new (window as any).Razorpay(options);
    razor.open();
  };

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Subscribe via UPI Autopay</h2>
      <input
        className="w-full p-2 mb-4 border rounded"
        placeholder="Enter your UPI ID"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
      />
      <button
        onClick={handlePayment}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Start Subscription
      </button>
    </div>
  );
}
