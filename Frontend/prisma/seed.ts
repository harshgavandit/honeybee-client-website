import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Clear existing products
    await prisma.product.deleteMany();

    // Create products with prices in paise (divide by 100 to get rupees)
    const products = await prisma.product.createMany({
      data: [
        {
          id: "honey-100ml",
          slug: "honey-100ml",
          name: "Pure Honey",
          size: "100ml",
          pricePaise: 29900, // ₹299
          imageUrl: "/images/honey-100ml.jpg",
          active: true,
        },
        {
          id: "honey-200ml",
          slug: "honey-200ml",
          name: "Pure Honey",
          size: "200ml",
          pricePaise: 49900, // ₹499
          imageUrl: "/images/honey-200ml.jpg",
          active: true,
        },
        {
          id: "honey-500ml",
          slug: "honey-500ml",
          name: "Pure Honey",
          size: "500ml",
          pricePaise: 99900, // ₹999
          imageUrl: "/images/honey-500ml.jpg",
          active: true,
        },
      ],
    });

    console.log("✅ Seeded products:", products);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
