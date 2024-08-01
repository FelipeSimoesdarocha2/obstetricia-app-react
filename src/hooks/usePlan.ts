import React, { useState, useEffect } from "react";

import { getPlan } from "@core/@http/doctor/doctor";

import { useToast } from "providers/ToastProvider/ToastProvider";

interface iPlan {
  daysRemanning: number;
  description: string;
  free: boolean;
}

export const usePlan = () => {
  const [loading, setLoading] = useState(false);

  const [plan, setPlan] = useState<iPlan>();

  const { toast } = useToast();

  const fetchPlan = async () => {
    try {
      setLoading(true);

      const response = await getPlan();

      if (response.data) {
        setPlan({
          ...response.data,
          description: response.data.plan,
          free: response.data.plan === "Free",
        });
      }
    } catch (error: any) {
      toast.error({
        title: "Erro",
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  return {
    plan,
    loading,
  };
};
