const express = require("express");

const createRoutes = (scheduleController) => {
  const router = express.Router();

  router.get(
    "/schedules/filter",
    scheduleController.filterSchedules.bind(scheduleController)
  );
  router.post(
    "/schedules",
    scheduleController.createSchedule.bind(scheduleController)
  );
  router.get(
    "/schedules",
    scheduleController.getAllSchedules.bind(scheduleController)
  );
  router.get(
    "/schedules/:id",
    scheduleController.getScheduleById.bind(scheduleController)
  );
  router.put(
    "/schedules/:id",
    scheduleController.updateSchedule.bind(scheduleController)
  );
  router.delete(
    "/schedules/:id",
    scheduleController.deleteSchedule.bind(scheduleController)
  );

  return router;
};

module.exports = createRoutes;
