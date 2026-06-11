import { Droplets, Flower2, Leaf, ShieldCheck, Sparkles, Truck } from "lucide-react";

export type Product = {
  id: string;
  slug: string;
  name: string;
  size: string;
  price: number;
  short: string;
  description: string;
  bestFor: string[];
  image: string;
  color: string;
};

export const products: Product[] = [
  {
    id: "jar-100",
    slug: "pure-honey-100ml",
    name: "Pure Honey",
    size: "100 ml",
    price: 149,
    short: "Small trial jar for daily warm water, tea, and kids above one year.",
    description:
      "A compact bottle for first-time customers who want to taste fresh local honey before ordering a bigger jar.",
    bestFor: ["Trial orders", "Daily spoon", "Travel-friendly"],
    image:
      "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=900&q=80",
    color: "bg-honey-100",
  },
  {
    id: "jar-200",
    slug: "pure-honey-200ml",
    name: "Pure Honey",
    size: "200 ml",
    price: 249,
    short: "Balanced family starter bottle for breakfast, drinks, and home remedies.",
    description:
      "The everyday size for customers who use honey regularly in milk, lemon water, breakfast bowls, and recipes.",
    bestFor: ["Small families", "Breakfast", "Home remedies"],
    image:
      "https://images.unsplash.com/photo-1555211652-5c6222f971bc?auto=format&fit=crop&w=900&q=80",
    color: "bg-[#e9f5dc]",
  },
  {
    id: "jar-500",
    slug: "pure-honey-500ml",
    name: "Pure Honey",
    size: "500 ml",
    price: 499,
    short: "Best value jar for regular honey users and monthly family use.",
    description:
      "A generous jar for homes that replace refined sugar with honey and prefer buying directly from a beekeeper.",
    bestFor: ["Monthly use", "Best value", "Family pantry"],
    image:
      "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=900&q=80",
    color: "bg-[#f8e2a4]",
  },
];

export const trustPoints = [
  {
    title: "Beekeeper-owned",
    text: "You buy directly from the person caring for the hives and packing each batch.",
    icon: ShieldCheck,
  },
  {
    title: "Simple ingredients",
    text: "No added flavours, no shortcuts, and no unnecessary processing.",
    icon: Leaf,
  },
  {
    title: "Fresh batches",
    text: "Honey is packed in small batches so customers receive fresh stock.",
    icon: Droplets,
  },
  {
    title: "Clear delivery",
    text: "Pincode-based estimate before checkout, with WhatsApp updates after order.",
    icon: Truck,
  },
];

export const processSteps = [
  {
    title: "Hive care",
    text: "Healthy colonies are maintained in clean, low-disturbance bee boxes near flowering areas.",
    icon: Flower2,
  },
  {
    title: "Careful extraction",
    text: "Honey is collected from honey frames, filtered, and packed with practical hygiene controls.",
    icon: Droplets,
  },
  {
    title: "Direct packing",
    text: "Small jars are packed for direct customers so the route from hive to kitchen stays short.",
    icon: Sparkles,
  },
];

export const deliveryZones = [
  { pattern: /^110/, label: "Delhi NCR", days: "3-5 working days" },
  { pattern: /^560/, label: "Bengaluru", days: "2-4 working days" },
  { pattern: /^400|^401/, label: "Mumbai region", days: "3-5 working days" },
  { pattern: /^600/, label: "Chennai", days: "2-4 working days" },
  { pattern: /^700/, label: "Kolkata", days: "4-6 working days" },
];

export const business = {
  name: "HoneyBee Farm",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "orders@honeybeefarm.in",
  location: "Local commercial beekeeper, India",
  upiId: "honeybeefarm@upi",
};

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getDeliveryEstimate(pincode: string) {
  const cleaned = pincode.trim();
  if (!/^\d{6}$/.test(cleaned)) {
    return {
      serviceable: false,
      label: "Enter a valid 6-digit pincode",
      days: "Estimate unavailable",
    };
  }

  const zone = deliveryZones.find((item) => item.pattern.test(cleaned));
  if (zone) {
    return { serviceable: true, label: zone.label, days: zone.days };
  }

  return {
    serviceable: true,
    label: "Courier service area",
    days: "4-7 working days",
  };
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
