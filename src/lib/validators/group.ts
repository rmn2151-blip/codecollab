import { z } from "zod";
import { MAX_GROUP_MEMBERS, MIN_GROUP_MEMBERS } from "@/lib/constants";

export const createGroupSchema = z.object({
  name: z.string().min(1, "Group name is required").max(100),
  restaurantId: z.string().uuid("Please select a restaurant"),
  dietaryRestrictions: z.array(z.string()).default([]),
  maxMembers: z
    .number()
    .min(MIN_GROUP_MEMBERS, `Minimum ${MIN_GROUP_MEMBERS} members`)
    .max(MAX_GROUP_MEMBERS, `Maximum ${MAX_GROUP_MEMBERS} members`),
  orderDeadline: z.string().refine(
    (val) => {
      const date = new Date(val);
      return date > new Date();
    },
    { message: "Deadline must be in the future" }
  ),
});

export type CreateGroupFormData = z.infer<typeof createGroupSchema>;
