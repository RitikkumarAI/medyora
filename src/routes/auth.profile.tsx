import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/shared/components/AuthLayout";
import { CITIES, LANGUAGES } from "@/shared/data/mock";

export const Route = createFileRoute("/auth/profile")({
  head: () => ({
    meta: [
      { title: "Complete your profile — MediConnect" },
      {
        name: "description",
        content:
          "Add your name, age, gender, city and preferred language so doctors get the context they need.",
      },
      { property: "og:title", content: "Complete your profile — MediConnect" },
      { property: "og:description", content: "Set up your MediConnect health profile." },
    ],
  }),
  component: CompleteProfile,
});

const ROLES = ["Patient", "Doctor"] as const;

function CompleteProfile() {
  const navigate = useNavigate();
  const [role, setRole] = useState<(typeof ROLES)[number]>("Patient");
  const [name, setName] = useState("");

  return (
    <AuthLayout title="Complete your profile" subtitle="This helps us personalise your care.">
      <div className="space-y-5">
        <div>
          <Label>I am a</Label>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {ROLES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                  role === r
                    ? "border-primary bg-accent text-accent-foreground"
                    : "border-input hover:bg-accent/50"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            className="mt-2"
            placeholder="Rahul Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="age">Age</Label>
            <Input id="age" className="mt-2" inputMode="numeric" placeholder="30" />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              className="mt-2 h-10 w-full rounded-xl border border-input bg-background px-3 text-sm"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="city">City</Label>
            <select
              id="city"
              className="mt-2 h-10 w-full rounded-xl border border-input bg-background px-3 text-sm"
            >
              {CITIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="lang">Preferred language</Label>
            <select
              id="lang"
              className="mt-2 h-10 w-full rounded-xl border border-input bg-background px-3 text-sm"
            >
              {LANGUAGES.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        <Button
          variant="hero"
          size="lg"
          className="w-full"
          onClick={() => {
            if (!name.trim()) {
              toast.error("Please enter your name");
              return;
            }
            toast.success("Profile saved");
            navigate({ to: role === "Doctor" ? "/doctors" : "/patient" });
          }}
        >
          Continue
        </Button>
      </div>
    </AuthLayout>
  );
}
