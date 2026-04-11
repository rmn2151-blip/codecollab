import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createGroupSchema } from "@/lib/validators/group";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("groups")
    .select("*, restaurants(*), group_members(user_id)")
    .eq("status", "open")
    .order("order_deadline", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const result = createGroupSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0].message },
      { status: 400 }
    );
  }

  const { name, restaurantId, dietaryRestrictions, maxMembers, orderDeadline } = result.data;

  // Create the group
  const { data: group, error: groupError } = await supabase
    .from("groups")
    .insert({
      name,
      restaurant_id: restaurantId,
      leader_id: user.id,
      dietary_restrictions: dietaryRestrictions,
      max_members: maxMembers,
      order_deadline: orderDeadline,
      status: "open",
    })
    .select("id")
    .single();

  if (groupError) {
    return NextResponse.json({ error: groupError.message }, { status: 500 });
  }

  // Add the creator as a leader member
  await supabase.from("group_members").insert({
    group_id: group.id,
    user_id: user.id,
    role: "leader",
  });

  return NextResponse.json({ id: group.id }, { status: 201 });
}
