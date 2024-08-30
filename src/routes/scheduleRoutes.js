import express from "express";
import { ScheduleController } from "../controllers/scheduleController.js";

const createRoutes = () => {
  const router = express.Router();

  router.get("/schedules/filter", ScheduleController.filterSchedules);
  router.post("/schedules", ScheduleController.createSchedule);
  router.get("/schedules", ScheduleController.getAllSchedules);
  router.get("/schedules/:id", ScheduleController.getScheduleById);
  router.put("/schedules/:id", ScheduleController.updateSchedule);
  router.delete("/schedules/:id", ScheduleController.deleteSchedule);

  return router;
};

export default createRoutes;
