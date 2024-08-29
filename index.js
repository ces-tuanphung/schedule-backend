const express = require("express");
const cors = require("cors");
const {
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy
} = require("firebase/firestore");
const { Schedule, db } = require("./config");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;
const STATUS = {
  PENDING: "PENDING",
  APPROVE: "APPROVE",
};

//filter
app.get("/schedules/filter", async (req, res) => {
  try {
    const { status } = req.query;
    const queryValue = query(Schedule, where("status", "==", status));
    const querySchedules = await getDocs(queryValue);

    if (querySchedules.empty) {
      return res.status(404).send({ error: "Not found" });
    }
    const scheduleFilter = querySchedules.docs.map((schedule) => ({
      id: schedule.id,
      ...schedule.data(),
    }));
    res.send(scheduleFilter );
  } catch (err) {
    res.status(500).send({ error: "Error query schedule: " + err.message });
  }
});

//create new schedule
app.post("/schedules", async (req, res) => {
  const data = req.body;
  try {
    const scheduleData = {
      status: STATUS.PENDING,
      ...data,
    };
    await addDoc(Schedule, scheduleData);
    res.send({ msg: "Add new schedule successfully." });
  } catch (err) {
    res.status(500).send({ error: "Error adding schedule: " + err.message });
  }
});

//get all schedules
app.get("/schedules", async (req, res) => {
  try {
    const q = query(Schedule, orderBy("date","asc"));
    const querySchedules = await getDocs(q)
    const sortSchedule = querySchedules.docs.map((schedule) => ({
      id: schedule.id,
      ...schedule.data()
    }))
    res.send(sortSchedule)
  } catch (err) {
    res.status(500).send({ error: "Error fetching schedules: " + err.message });
  }
});

//get schedule by id
app.get("/schedules/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const scheduleRef = doc(Schedule, id);
    const schedule = await getDoc(scheduleRef);

    if (schedule) {
      return res.send(schedule.data());
    }
    return res.status(400).send({ error: "Schedule not found" });
  } catch (err) {
    res
      .status(500)
      .send({ error: "Error fetching schedule by id : " + err.message });
  }
});

//update schedule
app.put("/schedules/:id", async (req, res) => {
  try {
    const newData = req.body;
    const { id } = req.params;
    const scheduleRef = doc(Schedule, id);
    const schedule = await getDoc(scheduleRef);

    if (!schedule) {
      return res.status(400).send({ error: "Schedule not found" });
    }
    await updateDoc(scheduleRef, { ...newData });
    const updatedSchedule = await getDoc(scheduleRef);

    res.send({
      schedule: { id: updatedSchedule.id, ...updatedSchedule.data() },
    });
  } catch (err) {
    res.status(500).send({ error: "Error update schedule: " + err.message });
  }
});

//delete schedule
app.delete("/schedules/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const scheduleRef = doc(Schedule, id);
    const schedule = await getDoc(scheduleRef);

    if (!schedule.exists()) {
      return res.status(404).send({ error: "Schedule not found" });
    }

    await deleteDoc(scheduleRef);

    res.send({
      msg: "Schedule deleted successfully.",
    });
  } catch (err) {
    res.status(500).send({ error: "Error deleting schedule: " + err.message });
  }
});


app
  .listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${PORT} is already in use. Trying ${PORT + 1}...`);
      app.listen(PORT + 1);
    } else {
      console.error(err);
    }
  });
