"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, Mail, MessageCircle, PackageCheck, Truck } from "lucide-react";
import { formatPrice } from "@/lib/data";
import {
  getMailTo,
  getOrderMessage,
  getProductLabel,
  getWhatsAppUrl,
  readOrders,
  updateOrder,
  type Order,
  type OrderStatus,
} from "@/lib/orders";

const orderStatuses: OrderStatus[] = [
  "placed",
  "confirmed",
  "packed",
  "dispatched",
  "delivered",
  "cancelled",
];

export function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(readOrders());
  }, []);

  function patchOrder(id: string, patch: Partial<Order>) {
    setOrders(updateOrder(id, patch));
  }

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Metric label="Total orders" value={orders.length} />
          <Metric
            label="UPI pending"
            value={
              orders.filter((order) => order.paymentStatus === "pending_verification")
                .length
            }
          />
          <Metric
            label="COD due"
            value={orders.filter((order) => order.paymentStatus === "cod_due").length}
          />
        </div>

        <div className="mt-8 grid gap-5">
          {orders.map((order) => {
            const verifiedMessage = getOrderMessage(order, "verified");
            return (
              <article
                key={order.id}
                className="rounded-lg border border-honey-100 bg-white p-5 shadow-soft"
              >
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold">{order.id}</h2>
                      <Badge>{order.paymentMethod === "COD" ? "COD" : "UPI"}</Badge>
                      <Badge>{order.paymentStatus.replaceAll("_", " ")}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-stone-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <div className="mt-4 grid gap-2 text-sm text-stone-700 sm:grid-cols-2 lg:grid-cols-4">
                      <Info label="Customer" value={order.customerName} />
                      <Info label="Phone" value={order.phone} />
                      <Info label="Product" value={`${order.quantity} x ${getProductLabel(order.productId)}`} />
                      <Info label="Total" value={formatPrice(order.total)} />
                      <Info label="Pincode" value={order.pincode} />
                      <Info label="Estimate" value={order.deliveryEstimate} />
                      <Info label="Txn ID" value={order.transactionId || "Not added"} />
                      <Info label="Proof" value={order.proofFileName || "Not uploaded"} />
                    </div>
                    <p className="mt-4 text-sm leading-6 text-stone-600">{order.address}</p>
                  </div>

                  <div className="grid min-w-64 gap-3">
                    <label className="text-sm font-semibold">
                      Order status
                      <select
                        className="focus-ring mt-2 w-full rounded-md border border-stone-200 p-3"
                        value={order.orderStatus}
                        onChange={(event) =>
                          patchOrder(order.id, {
                            orderStatus: event.target.value as OrderStatus,
                          })
                        }
                      >
                        {orderStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </label>

                    {order.paymentMethod === "UPI_BANK_TRANSFER" &&
                    order.paymentStatus !== "verified" ? (
                      <button
                        className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-leaf px-4 py-3 font-semibold text-white"
                        onClick={() =>
                          patchOrder(order.id, {
                            paymentStatus: "verified",
                            orderStatus: "confirmed",
                            paymentVerifiedAt: new Date().toISOString(),
                          })
                        }
                      >
                        <CheckCircle2 size={18} />
                        Verify bank payment
                      </button>
                    ) : null}

                    {order.paymentMethod === "COD" &&
                    order.paymentStatus !== "cod_collected" ? (
                      <button
                        className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-honey-500 px-4 py-3 font-semibold text-ink"
                        onClick={() =>
                          patchOrder(order.id, {
                            paymentStatus: "cod_collected",
                            orderStatus: "delivered",
                          })
                        }
                      >
                        <PackageCheck size={18} />
                        Mark COD collected
                      </button>
                    ) : null}

                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                      <Link
                        href={getWhatsAppUrl(order.phone, verifiedMessage)}
                        target="_blank"
                        className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-stone-300 px-4 py-3 font-semibold"
                      >
                        <MessageCircle size={18} />
                        WhatsApp verified
                      </Link>
                      <Link
                        href={getMailTo(
                          order.email,
                          `Payment verified for ${order.id}`,
                          verifiedMessage,
                        )}
                        className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-stone-300 px-4 py-3 font-semibold"
                      >
                        <Mail size={18} />
                        Email verified
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {orders.length === 0 ? (
          <div className="mt-8 rounded-lg border border-honey-100 bg-white p-8 text-center shadow-soft">
            <Truck className="mx-auto text-leaf" size={34} />
            <h2 className="mt-4 text-xl font-bold">No orders yet</h2>
            <p className="mt-2 text-stone-600">Place a test order from Buy honey.</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-honey-100 bg-white p-5 shadow-soft">
      <p className="text-sm font-semibold text-stone-500">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-honey-50 px-2 py-1 text-xs font-bold uppercase text-honey-900">
      {children}
    </span>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase text-stone-400">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}
