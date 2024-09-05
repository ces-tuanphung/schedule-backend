import {
  equalTo,
  get,
  orderByChild,
  push,
  query,
  ref,
  remove,
  update,
} from "firebase/database";
import { db, scheduleRef } from "../config.js";

export const ScheduleModel = {
  createSchedule: async (data) => {
    try {
      const newScheduleRef = push(scheduleRef);
      await update(newScheduleRef, data);
      return { id: newScheduleRef.key, ...data };
    } catch (err) {
      console.error("Error create new schedule: ", err);
      return { message: "Failed to create new schedule" };
    }
  },

  getAllSchedules: async () => {
    const scheduleQuery = query(scheduleRef, orderByChild("date"));
    const snapshot = await get(scheduleQuery);
    if (snapshot.exists()) {
      const schedules = [];
      snapshot.forEach((childSnapshot) => {
        schedules.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      return schedules;
    }
    return [];
  },

  getSchedulesByStatus: async (status) => {
    const scheduleQuery = query(
      scheduleRef,
      orderByChild("status"),
      equalTo(status)
    );
    const snapshot = await get(scheduleQuery);
    if (snapshot.exists()) {
      const schedules = [];
      snapshot.forEach((childSnapshot) => {
        schedules.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      return schedules;
    }
    return [];
  },

  getScheduleById: async (id) => {
    const snapshot = await get(ref(scheduleRef, id));
    if (snapshot.exists()) {
      return { id: snapshot.key, ...snapshot.val() };
    }
    return null;
  },

  updateSchedule: async (id, data) => {
    try {
      const updates = {};
      updates[`/schedules/${id}/status`] = data.status;

      await update(ref(db), updates);

      return { success: true, message: "Status updated successfully" };
    } catch (err) {
      console.error("Error updating status:", err);
      return { message: "Failed to update status" };
    }
  },

  deleteSchedule: async (id) => {
    try {
      const scheduleDelete = ref(db, `schedules/${id}`);
      await remove(scheduleDelete);
      return { success: true, message: "Schedule deleted successfully" };
    } catch (err) {
      console.error("Error deleting schedule:", err);
      return { message: "Failed to delete schedule" };
    }
  },
};
