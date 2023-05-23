import validator from 'validator';
import Scheduling from '../models/Scheduling.js';

class SchedulingController {
  async getAllSchedules(req, res) {
    const result = await Scheduling.index();
    res.status(200).json(result);
  }

  async createSchedule(req, res) {
    const {
      name, petName, symptoms, scheduleTime, scheduleDate,
    } = req.body;
    console.log(validator.isEmpty(petName));

    const result = await Scheduling.create(name, petName, symptoms, scheduleTime, scheduleDate);
    return res.status(200).json(result);
  }
}

export default new SchedulingController();
