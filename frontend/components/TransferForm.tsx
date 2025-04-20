"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { cookies } from "next/headers";

interface TransferFormData {
  toAccount: string;
  amount: number;
  description: string;
}

const TransferForm = () => {
  const [formData, setFormData] = useState<TransferFormData>({
    toAccount: "",
    amount: 0,
    description: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Get the token from local storage
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || undefined);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError("You must be logged in to make a transfer");
      setSuccess(false);
      return;
    }

    try {
      const response = await api.createTransaction({
        toAccount: formData.toAccount,
        amount: formData.amount,
        description: formData.description || "Transfer",
        type: "transfer",
      });

      if (response.success) {
        setSuccess(true);
        setError(null);
        // Redirect to dashboard or transactions page
        router.push("/dashboard/transactions");
      } else {
        setError(response.message || "Transfer failed");
        setSuccess(false);
      }
    } catch (err) {
      console.error("Transfer failed", err);
      setError("An error occurred during the transfer");
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Transfer successful!</p>}
      <input
        type="text"
        name="toAccount"
        placeholder="To Account"
        value={formData.toAccount}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <button type="submit">Transfer</button>
    </form>
  );
};

export default TransferForm;
