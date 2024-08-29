const { StatusCodes } = require("http-status-codes");

class ScheduleController {
  constructor(scheduleModel) {
    this.scheduleModel = scheduleModel;
  }

  async filterSchedules(req, res) {
    try {
      const { status } = req.query;
      const schedules = await this.scheduleModel.getSchedulesByStatus(status);
      if (!schedules.length) {
        return res.status(StatusCodes.NOT_FOUND).send({ error: "Not found" });
      }
      res.send(schedules);
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Error querying schedules: " + err.message });
    }
  }

  async createSchedule(req, res) {
    try {
      const scheduleData = { status: "PENDING", ...req.body };
      const newSchedule = await this.scheduleModel.createSchedule(scheduleData);
      res.send({
        msg: "Added new schedule successfully.",
        schedule: newSchedule,
      });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Error adding schedule: " + err.message });
    }
  }

  async getAllSchedules(req, res) {
    try {
      const schedules = await this.scheduleModel.getAllSchedules();
      res.send(schedules);
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Error fetching schedules: " + err.message });
    }
  }

  async getScheduleById(req, res) {
    try {
      const schedule = await this.scheduleModel.getScheduleById(req.params.id);
      if (!schedule) {
        return res.status(StatusCodes.NOT_FOUND).send({ error: "Schedule not found" });
      }
      res.send(schedule);
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Error fetching schedule: " + err.message });
    }
  }

  async updateSchedule(req, res) {
    try {
      const updatedSchedule = await this.scheduleModel.updateSchedule(
        req.params.id,
        req.body
      );
      res.send({ schedule: updatedSchedule });
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Error updating schedule: " + err.message });
    }
  }

  async deleteSchedule(req, res) {
    try {
      await this.scheduleModel.deleteSchedule(req.params.id);
      res.send({ msg: "Schedule deleted successfully." });
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Error deleting schedule: " + err.message });
    }
  }
}

module.exports = ScheduleController;
