"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { getDeliveryEstimate } from "@/lib/data";

export function DeliveryChecker() {
  const [pincode, setPincode] = useState("");
  const estimate = getDeliveryEstimate(pincode);
  const show = pincode.length > 0;

  return (
    <div className="rounded-lg border border-honey-100 bg-white p-4 shadow-soft">
      <label className="text-sm font-semibold text-stone-700" htmlFor="pin">
        Check delivery estimate
      </label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <MapPin
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
            size={18}
          />
          <input
            id="pin"
            value={pincode}
            onChange={(event) => setPincode(event.target.value)}
            inputMode="numeric"
            maxLength={6}
            className="focus-ring w-full rounded-md border border-stone-200 bg-white py-3 pl-10 pr-3"
            placeholder="Enter 6-digit pincode"
          />
        </div>
      </div>
      {show ? (
        <p className="mt-3 rounded-md bg-honey-50 px-3 py-2 text-sm font-medium text-stone-700">
          {estimate.label}: {estimate.days}
        </p>
      ) : null}
    </div>
  );
}
