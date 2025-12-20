

import { useState } from "react";

export type UseWaitlistReturn = {
  email: string;
  setEmail: (email: string) => void;
  loading: boolean;
  error: string;
  handleJoin: () => Promise<void>;
};

export function useWaitlist(): UseWaitlistReturn {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = (value: string) => {
    return /\S+@\S+\.\S+/.test(value);
  };

  const handleJoin = async () => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // @ts-ignore – global helper
      const result = await window.joinWaitlist(email);

      if (result?.success) {
        setEmail("");
        // @ts-ignore – global helper
        window.showToast("You're on the waitlist!", "success");
      } else {
        // @ts-ignore – global helper
        window.showToast("Something went wrong. Please try again.", "error");
      }
    } catch (err) {
      // @ts-ignore – global helper
      window.showToast("Unexpected error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    loading,
    error,
    handleJoin,
  };
}