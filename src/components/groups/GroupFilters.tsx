"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { DIETARY_RESTRICTIONS } from "@/lib/constants";

interface Restaurant {
  id: string;
  name: string;
}

interface GroupFiltersProps {
  restaurants: Restaurant[];
  filters: {
    restaurant: string;
    dietary: string[];
    flexDollars: boolean;
    deadline: string;
  };
  onFilterChange: (filters: GroupFiltersProps["filters"]) => void;
}

export function GroupFilters({ restaurants, filters, onFilterChange }: GroupFiltersProps) {
  return (
    <div className="space-y-4 rounded-lg border p-4">
      <h3 className="font-semibold">Filters</h3>

      <div className="space-y-2">
        <Label htmlFor="restaurant-filter">Restaurant</Label>
        <select
          id="restaurant-filter"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
          value={filters.restaurant}
          onChange={(e) => onFilterChange({ ...filters, restaurant: e.target.value })}
        >
          <option value="">All Restaurants</option>
          {restaurants.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>Dietary Restrictions</Label>
        <div className="grid grid-cols-2 gap-2">
          {DIETARY_RESTRICTIONS.map((diet) => (
            <div key={diet} className="flex items-center gap-2">
              <Checkbox
                id={`diet-${diet}`}
                checked={filters.dietary.includes(diet)}
                onCheckedChange={(checked) => {
                  const newDietary = checked
                    ? [...filters.dietary, diet]
                    : filters.dietary.filter((d) => d !== diet);
                  onFilterChange({ ...filters, dietary: newDietary });
                }}
              />
              <label htmlFor={`diet-${diet}`} className="text-sm">
                {diet}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="flex-dollars"
          checked={filters.flexDollars}
          onCheckedChange={(checked) =>
            onFilterChange({ ...filters, flexDollars: checked as boolean })
          }
        />
        <label htmlFor="flex-dollars" className="text-sm">
          Accepts Flex Dollars
        </label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="deadline-filter">Order by</Label>
        <Input
          id="deadline-filter"
          type="datetime-local"
          value={filters.deadline}
          onChange={(e) => onFilterChange({ ...filters, deadline: e.target.value })}
        />
      </div>
    </div>
  );
}
