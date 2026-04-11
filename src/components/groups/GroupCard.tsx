"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GroupCardProps {
  id: string;
  name: string;
  restaurantName: string;
  memberCount: number;
  maxMembers: number;
  dietaryRestrictions: string[];
  orderDeadline: string;
  acceptsFlexDollars: boolean;
  isMember: boolean;
  onJoin: (groupId: string) => void;
  onView: (groupId: string) => void;
}

function getTimeRemaining(deadline: string): string {
  const diff = new Date(deadline).getTime() - Date.now();
  if (diff <= 0) return "Expired";
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  if (hours > 0) return `${hours}h ${minutes % 60}m left`;
  return `${minutes}m left`;
}

export function GroupCard({
  id,
  name,
  restaurantName,
  memberCount,
  maxMembers,
  dietaryRestrictions,
  orderDeadline,
  acceptsFlexDollars,
  isMember,
  onJoin,
  onView,
}: GroupCardProps) {
  const isFull = memberCount >= maxMembers;
  const isExpired = new Date(orderDeadline).getTime() <= Date.now();

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{name}</CardTitle>
          <span className="text-sm text-muted-foreground">
            {getTimeRemaining(orderDeadline)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{restaurantName}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span>
            {memberCount}/{maxMembers} members
          </span>
          {acceptsFlexDollars && (
            <Badge variant="secondary">Flex Dollars</Badge>
          )}
        </div>
        {dietaryRestrictions.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {dietaryRestrictions.map((diet) => (
              <Badge key={diet} variant="outline" className="text-xs">
                {diet}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          {isMember ? (
            <Button className="w-full" onClick={() => onView(id)}>
              Open Chat
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={() => onJoin(id)}
              disabled={isFull || isExpired}
            >
              {isFull ? "Group Full" : isExpired ? "Expired" : "Join Group"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
