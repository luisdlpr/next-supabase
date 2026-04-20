"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Avatar from "./avatar";

type Claims = { sub: string; email?: string;[key: string]: unknown };

export default function AccountForm({ claims }: { claims: Claims | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      if (!claims?.sub) {
        setLoading(false);
        return;
      }

      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", claims.sub)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [claims, supabase]);

  useEffect(() => {
    getProfile(); //eslint-disable-line react-hooks/set-state-in-effect
  }, [claims, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      if (!claims?.sub) {
        alert("You must be logged in to update your profile");
        return;
      }

      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: claims.sub,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Profile
          </h1>
          <p className="mt-2 text-sm text-foreground/60">
            Manage your account settings
          </p>
        </div>
        <div className="space-y-6">
          <div className="flex justify-center">
            <Avatar
              uid={claims?.sub ?? null}
              url={avatar_url}
              size={150}
              onUploadAction={(url) => {
                setAvatarUrl(url);
                updateProfile({ fullname, username, website, avatar_url: url });
              }}
            />
          </div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground/80 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                value={claims?.email ?? ""}
                disabled
                className="w-full px-4 py-2.5 rounded-lg border border-foreground/10 bg-foreground/5 text-foreground/60 cursor-not-allowed"
              />
            </div>
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-foreground/80 mb-1.5"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullname || ""}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-foreground/10 bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-foreground/80 mb-1.5"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-foreground/10 bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-foreground/80 mb-1.5"
              >
                Website
              </label>
              <input
                id="website"
                type="url"
                value={website || ""}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-foreground/10 bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() =>
                updateProfile({ fullname, username, website, avatar_url })
              }
              disabled={loading || !claims?.sub}
              className="w-full px-4 py-2.5 text-sm font-medium rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Update Profile"}
            </button>

            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="w-full px-4 py-2.5 text-sm font-medium rounded-lg border border-foreground/20 text-foreground hover:bg-foreground/5 transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
