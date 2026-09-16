export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15";
  };
  public: {
    Tables: {
      appointments: {
        Row: {
          amount: number;
          appointment_date: string;
          cancel_reason: string | null;
          cancelled_at: string | null;
          created_at: string;
          doctor_id: string;
          id: string;
          patient_id: string;
          patient_name: string;
          previous_date: string | null;
          previous_slot: string | null;
          reason: string | null;
          rescheduled_at: string | null;
          slot_time: string;
          status: Database["public"]["Enums"]["appointment_status"];
          token: number;
          updated_at: string;
          visit_type: string;
        };
        Insert: {
          amount?: number;
          appointment_date: string;
          cancel_reason?: string | null;
          cancelled_at?: string | null;
          created_at?: string;
          doctor_id: string;
          id?: string;
          patient_id: string;
          patient_name?: string;
          previous_date?: string | null;
          previous_slot?: string | null;
          reason?: string | null;
          rescheduled_at?: string | null;
          slot_time: string;
          status?: Database["public"]["Enums"]["appointment_status"];
          token?: number;
          updated_at?: string;
          visit_type?: string;
        };
        Update: {
          amount?: number;
          appointment_date?: string;
          cancel_reason?: string | null;
          cancelled_at?: string | null;
          created_at?: string;
          doctor_id?: string;
          id?: string;
          patient_id?: string;
          patient_name?: string;
          previous_date?: string | null;
          previous_slot?: string | null;
          reason?: string | null;
          rescheduled_at?: string | null;
          slot_time?: string;
          status?: Database["public"]["Enums"]["appointment_status"];
          token?: number;
          updated_at?: string;
          visit_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey";
            columns: ["doctor_id"];
            isOneToOne: false;
            referencedRelation: "doctors";
            referencedColumns: ["id"];
          },
        ];
      };
      doctors: {
        Row: {
          about: string;
          available_today: boolean;
          city: string;
          clinic_address: string;
          clinic_city: string;
          clinic_id: string;
          clinic_name: string;
          created_at: string;
          experience: number;
          fee: number;
          full_name: string;
          gender: string;
          home_visit: boolean;
          id: string;
          image: string;
          languages: string[];
          next_slot: string;
          qualification: string;
          rating: number;
          speciality: string;
          total_reviews: number;
          updated_at: string;
          user_id: string | null;
          verified: boolean;
        };
        Insert: {
          about?: string;
          available_today?: boolean;
          city?: string;
          clinic_address?: string;
          clinic_city?: string;
          clinic_id?: string;
          clinic_name?: string;
          created_at?: string;
          experience?: number;
          fee?: number;
          full_name: string;
          gender?: string;
          home_visit?: boolean;
          id: string;
          image?: string;
          languages?: string[];
          next_slot?: string;
          qualification?: string;
          rating?: number;
          speciality: string;
          total_reviews?: number;
          updated_at?: string;
          user_id?: string | null;
          verified?: boolean;
        };
        Update: {
          about?: string;
          available_today?: boolean;
          city?: string;
          clinic_address?: string;
          clinic_city?: string;
          clinic_id?: string;
          clinic_name?: string;
          created_at?: string;
          experience?: number;
          fee?: number;
          full_name?: string;
          gender?: string;
          home_visit?: boolean;
          id?: string;
          image?: string;
          languages?: string[];
          next_slot?: string;
          qualification?: string;
          rating?: number;
          speciality?: string;
          total_reviews?: number;
          updated_at?: string;
          user_id?: string | null;
          verified?: boolean;
        };
        Relationships: [];
      };
      medical_records: {
        Row: {
          created_at: string;
          file_name: string | null;
          file_path: string | null;
          file_size: number | null;
          id: string;
          mime_type: string | null;
          notes: string | null;
          patient_id: string;
          record_date: string;
          record_type: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          file_name?: string | null;
          file_path?: string | null;
          file_size?: number | null;
          id?: string;
          mime_type?: string | null;
          notes?: string | null;
          patient_id: string;
          record_date?: string;
          record_type?: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          file_name?: string | null;
          file_path?: string | null;
          file_size?: number | null;
          id?: string;
          mime_type?: string | null;
          notes?: string | null;
          patient_id?: string;
          record_date?: string;
          record_type?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      prescriptions: {
        Row: {
          advice: string;
          appointment_id: string | null;
          created_at: string;
          diagnosis: string;
          doctor_id: string;
          follow_up_date: string | null;
          id: string;
          issued_on: string;
          medicines: Json;
          patient_id: string;
          patient_name: string;
          updated_at: string;
        };
        Insert: {
          advice?: string;
          appointment_id?: string | null;
          created_at?: string;
          diagnosis?: string;
          doctor_id: string;
          follow_up_date?: string | null;
          id?: string;
          issued_on?: string;
          medicines?: Json;
          patient_id: string;
          patient_name?: string;
          updated_at?: string;
        };
        Update: {
          advice?: string;
          appointment_id?: string | null;
          created_at?: string;
          diagnosis?: string;
          doctor_id?: string;
          follow_up_date?: string | null;
          id?: string;
          issued_on?: string;
          medicines?: Json;
          patient_id?: string;
          patient_name?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "prescriptions_appointment_id_fkey";
            columns: ["appointment_id"];
            isOneToOne: false;
            referencedRelation: "appointments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "prescriptions_doctor_id_fkey";
            columns: ["doctor_id"];
            isOneToOne: false;
            referencedRelation: "doctors";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          address: string | null;
          age: number | null;
          blood_group: string | null;
          city: string | null;
          created_at: string;
          email: string | null;
          full_name: string;
          gender: string | null;
          id: string;
          language: string | null;
          phone: string | null;
          updated_at: string;
        };
        Insert: {
          address?: string | null;
          age?: number | null;
          blood_group?: string | null;
          city?: string | null;
          created_at?: string;
          email?: string | null;
          full_name?: string;
          gender?: string | null;
          id: string;
          language?: string | null;
          phone?: string | null;
          updated_at?: string;
        };
        Update: {
          address?: string | null;
          age?: number | null;
          blood_group?: string | null;
          city?: string | null;
          created_at?: string;
          email?: string | null;
          full_name?: string;
          gender?: string | null;
          id?: string;
          language?: string | null;
          phone?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
      owns_doctor: { Args: { _doctor_id: string }; Returns: boolean };
    };
    Enums: {
      app_role: "patient" | "doctor" | "admin";
      appointment_status: "confirmed" | "consulting" | "completed" | "cancelled" | "skipped";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["patient", "doctor", "admin"],
      appointment_status: ["confirmed", "consulting", "completed", "cancelled", "skipped"],
    },
  },
} as const;
