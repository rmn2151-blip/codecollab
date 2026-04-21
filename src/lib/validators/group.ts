import { z } from "zod";
import { MAX_GROUP_MEMBERS, MIN_GROUP_MEMBERS } from "@/lib/constants";

export const createGroupSchema = z.object({
  name: z.string().min(2, "Group name must be at least 2 characters").max(100),
  restaurantId: z.string().uuid("Please select a restaurant"),
  dietaryRestrictions: z.array(z.string()).default([]),
  maxMembers: z
    .number()
    .min(MIN_GROUP_MEMBERS, `Minimum ${MIN_GROUP_MEMBERS} members`)
    .max(MAX_GROUP_MEMBERS, `Maximum ${MAX_GROUP_MEMBERS} members`),
  orderDeadline: z.string().refine(
    (val) => {
      const selected = new Date(val);
      const now = new Date();
      now.setSeconds(0, 0);
      return selected > now;
    },
    { message: "Deadline must be in the future" }
  ).refine(
    (val) => {
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 7);
      return new Date(val) <= maxDate;
    },
    { message: "Deadline can't be more than 7 days away" }
  ),
});

export type CreateGroupFormData = z.infer<typeof createGroupSchema>;
