import {
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { Schedule } from "../config.js";

export const ScheduleModel = {
  createSchedule: async (data) => {
    const newDoc = await addDoc(Schedule, data);
    return { id: newDoc.id, ...data };
  },

  getAllSchedules: async () => {
    const scheduleQuery = query(Schedule, orderBy("date", "asc"));
    const querySnapshot = await getDocs(scheduleQuery);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  getSchedulesByStatus: async (status) => {
    const scheduleQuery = query(Schedule, where("status", "==", status));
    const querySnapshot = await getDocs(scheduleQuery);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  getScheduleById: async (id) => {
    const docRef = doc(Schedule, id);
    const scheduleDoc = await getDoc(docRef);
    return scheduleDoc.exists()
      ? { id: scheduleDoc.id, ...scheduleDoc.data() }
      : null;
  },

  updateSchedule: async (id, data) => {
    const docRef = doc(Schedule, id);
    await updateDoc(docRef, data);
    const updatedDoc = await getDoc(docRef);
    return { id: updatedDoc.id, ...updatedDoc.data() };
  },

  deleteSchedule: async (id) => {
    const docRef = doc(Schedule, id);
    await deleteDoc(docRef);
  },
};
