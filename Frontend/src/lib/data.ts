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
  highlights: string[];
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
    highlights: ["Packed fresh", "No added sugar", "Easy first order"],
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
    highlights: ["Best starter size", "UPI or COD", "WhatsApp support"],
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
    highlights: ["Best value", "Family use", "Fresh batch packing"],
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
  phone: "+91 95033 83378",
  whatsapp: "919503383378",
  email: "anshkoli0101@gmail.com",
  location: "Dighode, Uran, Raigad, Maharashtra 410206",
  upiId: "anshkoli413@okicici",
};

export type Testimonial = {
  name: string;
  location: string;
  text: string;
  verified: boolean;
};

export const testimonials: Testimonial[] = [
  {
    name: "Rajesh M.",
    location: "Pune",
    text: "The honey tasted fresh and natural. Ordering was simple and the WhatsApp updates were helpful.",
    verified: true,
  },
  {
    name: "Anita P.",
    location: "Mumbai",
    text: "Loved the taste. My family uses it with warm milk and breakfast.",
    verified: true,
  },
  {
    name: "Vikram N.",
    location: "Bangalore",
    text: "Good quality for the price. The jar arrived safely and was packed neatly.",
    verified: true,
  },
  {
    name: "Priya K.",
    location: "Nashik",
    text: "Buying directly from the beekeeper gave me more confidence than a random marketplace listing.",
    verified: true,
  },
  {
    name: "Amit D.",
    location: "Delhi NCR",
    text: "Ordered for family use. Clear communication and good freshness.",
    verified: true,
  },
  {
    name: "Meera S.",
    location: "Ahmedabad",
    text: "A smooth order experience and a clean, natural taste.",
    verified: true,
  },
];

export type FAQ = {
  q: string;
  a: string;
};

export const faqs: FAQ[] = [
  {
    q: "How is your honey produced?",
    a: "Our honey is produced from managed honeybee colonies near flowering areas. When the honeycomb is ready, we extract, filter, and pack the honey carefully in small batches.",
  },
  {
    q: "Is it pure and raw honey?",
    a: "We sell honey with no added sugar, artificial sweeteners, or flavours. Each batch is handled with a simple, direct process from hive care to packing.",
  },
  {
    q: "What's the shelf life of honey?",
    a: "Honey keeps well when stored in a clean, tightly closed jar away from moisture, heat, and direct sunlight.",
  },
  {
    q: "Why does honey crystallize?",
    a: "Crystallization is completely normal and is actually a sign of pure honey. It happens when glucose naturally separates from water. To liquify, gently warm the jar in warm water (never microwave). The honey remains pure.",
  },
  {
    q: "Can babies eat honey?",
    a: "Honey should NOT be given to children under 1 year old due to the risk of botulism. For children 1 year and older, honey is completely safe and nutritious.",
  },
  {
    q: "How long does delivery take?",
    a: "Delivery times depend on your location. Check your delivery estimate during checkout using your pincode. Delhi NCR: 3-5 days, Bengaluru: 2-4 days, Mumbai: 3-5 days, Chennai: 2-4 days. Other areas: 4-7 days.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI transfers (with QR code scanning) and Cash on Delivery (COD). Both methods are secure and convenient. You can pay using Google Pay, PhonePe, Paytm, BHIM, or any UPI-enabled app.",
  },
  {
    q: "What's your return and refund policy?",
    a: "If your product arrives damaged or there is an order issue, contact us within 7 days with photos and your order details so we can help with a replacement or refund where applicable.",
  },
  {
    q: "Do you deliver to my area?",
    a: "We deliver to most serviceable areas across India. Enter your pincode at checkout to see if we deliver to your location and get an estimated delivery time. Contact us if your area is not serviceable yet.",
  },
  {
    q: "How do I track my order?",
    a: "After placing your order, you receive an order number and can continue the conversation on WhatsApp. We use WhatsApp for payment verification and delivery coordination.",
  },
  {
    q: "Is my payment secure?",
    a: "For UPI orders, you pay directly to our UPI ID and submit the transaction reference. For COD orders, you pay at delivery. We do not collect card details on this website.",
  },
  {
    q: "What if I don't like the honey?",
    a: "Contact us within 7 days if there is a quality, leakage, damage, or order issue. We review each case and help with a practical resolution.",
  },
];


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
