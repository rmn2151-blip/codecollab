"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createGroupSchema, type CreateGroupFormData } from "@/lib/validators/group";
import { DIETARY_RESTRICTIONS, MIN_GROUP_MEMBERS, MAX_GROUP_MEMBERS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Restaurant {
  id: string;
  name: string;
}

interface CreateGroupFormProps {
  restaurants: Restaurant[];
}

export function CreateGroupForm({ restaurants }: CreateGroupFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    restaurantId: "",
    dietaryRestrictions: [] as string[],
    maxMembers: 8,
    orderDeadline: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const result = createGroupSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors({ form: data.error || "Failed to create group" });
        setLoading(false);
        return;
      }

      const { id } = await res.json();
      router.push(`/groups/${id}`);
    } catch {
      setErrors({ form: "Something went wrong" });
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.form && (
        <p className="text-sm text-red-500">{errors.form}</p>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Group Name</Label>
        <Input
          id="name"
          placeholder="e.g. Lunch at Chipotle"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="restaurant">Restaurant</Label>
        <select
          id="restaurant"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
          value={formData.restaurantId}
          onChange={(e) => setFormData({ ...formData, restaurantId: e.target.value })}
        >
          <option value="">Select a restaurant</option>
          {restaurants.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
        {errors.restaurantId && <p className="text-sm text-red-500">{errors.restaurantId}</p>}
      </div>

      <div className="space-y-2">
        <Label>Dietary Restrictions</Label>
        <div className="grid grid-cols-2 gap-2">
          {DIETARY_RESTRICTIONS.map((diet) => (
            <div key={diet} className="flex items-center gap-2">
              <Checkbox
                id={`create-diet-${diet}`}
                checked={formData.dietaryRestrictions.includes(diet)}
                onCheckedChange={(checked) => {
                  const newDietary = checked
                    ? [...formData.dietaryRestrictions, diet]
                    : formData.dietaryRestrictions.filter((d) => d !== diet);
                  setFormData({ ...formData, dietaryRestrictions: newDietary });
                }}
              />
              <label htmlFor={`create-diet-${diet}`} className="text-sm">
                {diet}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="maxMembers">
          Max Members: {formData.maxMembers}
        </Label>
        <input
          id="maxMembers"
          type="range"
          min={MIN_GROUP_MEMBERS}
          max={MAX_GROUP_MEMBERS}
          value={formData.maxMembers}
          onChange={(e) => setFormData({ ...formData, maxMembers: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{MIN_GROUP_MEMBERS}</span>
          <span>{MAX_GROUP_MEMBERS}</span>
        </div>
        {errors.maxMembers && <p className="text-sm text-red-500">{errors.maxMembers}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="orderDeadline">Order Deadline</Label>
        <Input
          id="orderDeadline"
          type="datetime-local"
          value={formData.orderDeadline}
          onChange={(e) => setFormData({ ...formData, orderDeadline: e.target.value })}
        />
        {errors.orderDeadline && <p className="text-sm text-red-500">{errors.orderDeadline}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating..." : "Create Group"}
      </Button>
    </form>
  );
}
