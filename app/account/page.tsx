import AccountForm from "./account-form";
import { createClient } from "@/lib/supabase/server";
import { requireVerifiedUser } from "@/lib/supabase/auth";

export default async function Account() {
  await requireVerifiedUser();

  const supabase = await createClient();

  const { data: claimsData } = await supabase.auth.getClaims();

  return <AccountForm claims={claimsData?.claims ?? null} />;
}
