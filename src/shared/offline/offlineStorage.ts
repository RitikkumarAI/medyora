/**
 * Medyora Offline Cache & IndexedDB/LocalStorage Storage Layer
 * Stores critical offline datasets: Doctors, Appointments, Queue Status, Prescriptions, Health ID.
 */

const STORAGE_KEYS = {
  OFFLINE_DOCTORS: "medyora_offline_doctors",
  OFFLINE_APPOINTMENTS: "medyora_offline_appointments",
  OFFLINE_QUEUE: "medyora_offline_queue",
  OFFLINE_PRESCRIPTIONS: "medyora_offline_prescriptions",
  OFFLINE_PROFILE: "medyora_offline_profile",
  OFFLINE_TIMESTAMP: "medyora_offline_synced_at",
};

export interface OfflineCacheStats {
  cachedDoctorsCount: number;
  cachedAppointmentsCount: number;
  cachedPrescriptionsCount: number;
  lastSyncedAt: string | null;
}

export const offlineStorage = {
  // Save cache
  saveDoctors(doctors: unknown[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.OFFLINE_DOCTORS, JSON.stringify(doctors));
      localStorage.setItem(STORAGE_KEYS.OFFLINE_TIMESTAMP, new Date().toISOString());
    } catch (err) {
      console.warn("[OfflineStorage] Failed to cache doctors:", err);
    }
  },

  getDoctors<T = unknown[]>(): T | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.OFFLINE_DOCTORS);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveAppointments(appointments: unknown[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.OFFLINE_APPOINTMENTS, JSON.stringify(appointments));
    } catch (err) {
      console.warn("[OfflineStorage] Failed to cache appointments:", err);
    }
  },

  getAppointments<T = unknown[]>(): T | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.OFFLINE_APPOINTMENTS);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveLiveQueue(queueData: unknown) {
    try {
      localStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify(queueData));
    } catch (err) {
      console.warn("[OfflineStorage] Failed to cache queue:", err);
    }
  },

  getLiveQueue<T = unknown>(): T | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  savePrescriptions(prescriptions: unknown[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.OFFLINE_PRESCRIPTIONS, JSON.stringify(prescriptions));
    } catch (err) {
      console.warn("[OfflineStorage] Failed to cache prescriptions:", err);
    }
  },

  getPrescriptions<T = unknown[]>(): T | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.OFFLINE_PRESCRIPTIONS);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  getStats(): OfflineCacheStats {
    const doctors = this.getDoctors() as unknown[];
    const appointments = this.getAppointments() as unknown[];
    const prescriptions = this.getPrescriptions() as unknown[];
    const lastSyncedAt = localStorage.getItem(STORAGE_KEYS.OFFLINE_TIMESTAMP);

    return {
      cachedDoctorsCount: Array.isArray(doctors) ? doctors.length : 0,
      cachedAppointmentsCount: Array.isArray(appointments) ? appointments.length : 0,
      cachedPrescriptionsCount: Array.isArray(prescriptions) ? prescriptions.length : 0,
      lastSyncedAt,
    };
  },

  clearOfflineCache() {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  },
};
