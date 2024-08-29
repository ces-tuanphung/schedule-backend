const {
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} = require("firebase/firestore");

class ScheduleModel {
  constructor(db, Schedule) {
    this.db = db;
    this.Schedule = Schedule;
  }

  async createSchedule(data) {
    const newDoc = await addDoc(this.Schedule, data);
    return { id: newDoc.id, ...data };
  }

  async getAllSchedules() {
    const scheduleQuery = query(this.Schedule, orderBy("date", "asc"));
    const querySnapshot = await getDocs(scheduleQuery);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getSchedulesByStatus(status) {
    const scheduleQuery = query(this.Schedule, where("status", "==", status));
    const querySnapshot = await getDocs(scheduleQuery);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getScheduleById(id) {
    const docRef = doc(this.Schedule, id);
    const scheduleDoc = await getDoc(docRef);
    return scheduleDoc.exists()
      ? { id: scheduleDoc.id, ...scheduleDoc.data() }
      : null;
  }

  async updateSchedule(id, data) {
    const docRef = doc(this.Schedule, id);
    await updateDoc(docRef, data);
    const updatedDoc = await getDoc(docRef);
    return { id: updatedDoc.id, ...updatedDoc.data() };
  }

  async deleteSchedule(id) {
    const docRef = doc(this.Schedule, id);
    await deleteDoc(docRef);
  }
}

module.exports = ScheduleModel;
