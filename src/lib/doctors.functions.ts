import { createServerFn } from "@tanstack/react-start";
import { mapDoctor } from "@/shared/data/doctor-mapper";
import { publicSupabase } from "./doctors.server";

export const listDoctors = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicSupabase()
    .from("doctors")
    .select("*")
    .order("rating", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapDoctor);
});

export const getDoctor = createServerFn({ method: "GET" })
  .inputValidator((input: { doctorId: string }) => input)
  .handler(async ({ data: input }) => {
    const { data, error } = await publicSupabase()
      .from("doctors")
      .select("*")
      .eq("id", input.doctorId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data ? mapDoctor(data) : null;
  });

export const getBookedSlots = createServerFn({ method: "GET" })
  .inputValidator((input: { doctorId: string; date: string }) => input)
  .handler(async ({ data: input }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("appointments")
      .select("slot_time")
      .eq("doctor_id", input.doctorId)
      .eq("appointment_date", input.date)
      .neq("status", "cancelled");
    if (error) throw new Error(error.message);
    return (data ?? []).map((r) => r.slot_time);
  });
