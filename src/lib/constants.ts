export const MAX_GROUP_MEMBERS = 18;
export const MIN_GROUP_MEMBERS = 2;

export const DIETARY_RESTRICTIONS = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Halal",
  "Kosher",
  "Dairy-Free",
  "Nut-Free",
  "Pescatarian",
] as const;

export const GROUP_STATUS = {
  OPEN: "open",
  ORDERING: "ordering",
  CLOSED: "closed",
} as const;
