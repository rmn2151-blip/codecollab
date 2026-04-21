import { z } from "zod";

export const orderItemSchema = z.object({
  itemName: z.string().min(1, "Item name is required").max(100, "Item name is too long"),
  price: z
    .number()
    .positive("Price must be greater than $0")
    .max(500, "Price can't exceed $500")
    .multipleOf(0.01, "Price must be in dollars and cents"),
});

export type OrderItemFormData = z.infer<typeof orderItemSchema>;
