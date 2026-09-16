import { PRESCRIPTIONS } from "../data/app-mock";
import { DOCTORS } from "../data/mock";

// Mock API for Doctors
export const DoctorService = {
  getDoctors: async (_params?: Record<string, unknown>) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      message: "Success",
      data: DOCTORS,
      meta: { page: 1, limit: 10, total: DOCTORS.length, totalPages: 1 },
    };
  },
  getDoctorById: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const doctor = DOCTORS.find((d) => d.id === id);
    if (!doctor) {
      return { success: false, message: "Doctor not found" };
    }
    return { success: true, message: "Success", data: doctor };
  },
};

// Mock API for Patient Appointments
export const AppointmentService = {
  getUpcoming: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      message: "Success",
      data: [], // mock empty for now
    };
  },
};
