const express = require("express");
const cors = require("cors");
const { db, Schedule } = require("./config");
const ScheduleModel = require("./models/scheduleModel");
const ScheduleController = require("./controllers/scheduleController");
const createRoutes = require("./routes/scheduleRoutes");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

const scheduleModel = new ScheduleModel(db, Schedule);
const scheduleController = new ScheduleController(scheduleModel);
const routes = createRoutes(scheduleController);

app.use("/", routes);

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
