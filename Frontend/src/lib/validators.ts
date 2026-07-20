import { z } from "zod";

export const checkoutFormSchema = z.object({
  customerName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),
  addressLine1: z.string().min(5, "Address is too short").max(200),
  addressLine2: z.string().max(200).optional(),
  city: z.string().min(2, "City is required").max(100),
  state: z.string().min(2, "State is required").max(100),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Pincode must be 6 digits"),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1),
      })
    )
    .min(1, "Cart is empty"),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
