import { StatusCodes } from "http-status-codes";
import { ScheduleModel } from "../models/scheduleModel.js";

export const ScheduleController = {
  filterSchedules: async (req, res) => {
    try {
      const { status } = req.query;
      const schedules = await ScheduleModel.getSchedulesByStatus(status);
      if (!schedules.length) {
        return res.status(StatusCodes.NOT_FOUND).send({ error: "Not found" });
      }
      res.send(schedules);
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Error querying schedules: " + err.message });
    }
  },

  createSchedule: async (req, res) => {
    try {
      const scheduleData = { status: "PENDING", ...req.body };
      const newSchedule = await ScheduleModel.createSchedule(scheduleData);
      res.send({
        msg: "Added new schedule successfully.",
        schedule: newSchedule,
      });
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Error adding schedule: " + err.message });
    }
  },

  getAllSchedules: async (req, res) => {
    try {
      const schedules = await ScheduleModel.getAllSchedules();
      res.send(schedules);
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Error fetching schedules: " + err.message });
    }
  },

  getScheduleById: async (req, res) => {
    try {
      const schedule = await ScheduleModel.getScheduleById(req.params.id);
      if (!schedule) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ error: "Schedule not found" });
      }
      res.send(schedule);
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Error fetching schedule: " + err.message });
    }
  },

  updateSchedule: async (req, res) => {
    try {
      const updatedSchedule = await ScheduleModel.updateSchedule(
        req.params.id,
        req.body
      );
      res.send({ schedule: updatedSchedule });
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Error updating schedule: " + err.message });
    }
  },

  deleteSchedule: async (req, res) => {
    try {
      await ScheduleModel.deleteSchedule(req.params.id);
      res.send({ msg: "Schedule deleted successfully." });
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Error deleting schedule: " + err.message });
    }
  },
};
