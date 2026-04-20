import { createClient } from "./server";
import { redirect } from "next/navigation";

export async function requireVerifiedUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (!user.confirmed_at) {
    redirect("/verify-email");
  }

  return user;
}
