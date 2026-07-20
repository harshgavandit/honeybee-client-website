"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  totalPaise: number;
}

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const razorpayOrderId = searchParams.get("razorpay_order_id");

    if (!razorpayOrderId) {
      router.push("/");
      return;
    }

    const checkOrderStatus = async () => {
      try {
        const response = await fetch(
          `/api/orders/by-razorpay?razorpay_order_id=${razorpayOrderId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch order");
        }

        const data = await response.json();

        if (data.order) {
          setOrder(data.order);
          setOrderId(data.order.id);
          setConfirmed(true);
        } else {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setConfirmed(true);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error checking order:", error);
        setLoading(false);
      }
    };

    checkOrderStatus();
  }, [searchParams, router]);

  useEffect(() => {
    if (confirmed) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [confirmed, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          <p className="mt-4 text-amber-900 font-medium">
            Processing your payment...
          </p>
        </div>
      </div>
    );
  }

  if (!confirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="text-center">
          <p className="text-amber-900 font-medium">Order processing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-amber-900 mb-2">
          Payment Successful!
        </h1>

        <p className="text-amber-700 mb-6">
          Thank you for your purchase.
        </p>

        <div className="bg-amber-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-amber-700 mb-2">Order ID</p>
          <p className="text-lg font-mono font-bold text-amber-900">
            {orderId || "Processing..."}
          </p>
        </div>

        <div className="space-y-2 text-sm text-amber-700 mb-6">
          <p>
            <strong>Payment Status:</strong> Captured
          </p>
          <p>
            A confirmation email has been sent to your registered email address.
          </p>
          <p>Our team will process your order shortly.</p>
        </div>

        <p className="text-xs text-amber-600">
          Redirecting to home page in 5 seconds...
        </p>
      </div>
    </div>
  );
}
