import type { Metadata } from "next";
import { business } from "./data";

export function generateMetadata(
  title: string,
  description: string,
  path: string = "",
  image: string = "/images/honeycomb-1.jpg"
): Metadata {
  const url = path ? `https://honeybeefarm.in${path}` : "https://honeybeefarm.in";

  return {
    title: `${title} | HoneyBee Farm`,
    description,
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      title: `${title} | HoneyBee Farm`,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | HoneyBee Farm`,
      description,
    },
  };
}

export function generateProductSchema(productName: string, price: number, size: string) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: productName,
    image: "https://honeybeefarm.in/images/honeycomb-1.jpg",
    description: `Pure honey in ${size} jar`,
    brand: {
      "@type": "Brand",
      name: "HoneyBee Farm",
    },
    offers: {
      "@type": "Offer",
      url: "https://honeybeefarm.in/buy-honey",
      priceCurrency: "INR",
      price: price.toString(),
      availability: "https://schema.org/InStock",
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    image: "https://honeybeefarm.in/images/honeycomb-1.jpg",
    description: "Pure, raw honey directly from our farm",
    url: "https://honeybeefarm.in",
    telephone: business.phone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.location,
      addressCountry: "IN",
    },
    areaServed: ["IN"],
    priceRange: "₹149-₹499",
  };
}
