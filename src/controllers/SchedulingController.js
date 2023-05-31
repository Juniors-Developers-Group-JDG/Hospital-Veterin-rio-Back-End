import Scheduling from '../models/Scheduling.js';

class SchedulingController {
  async getAllSchedules(req, res) {
    const result = await Scheduling.index();
    res.status(200).json(result);
  }

  async createSchedule(req, res) {
    const {
      name, petName, specialty, symptoms, startTime, scheduleDate,
    } = req.body;
    try {
      const result = await Scheduling.create(
        name,
        petName,

        specialty,

        symptoms,

        startTime,

        scheduleDate,
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ msg: 'Bad Request' });
    }
  }

  async reschedule(req, res) {
    const { id } = req.params;
    const { scheduleDate, scheduleTime } = req.body;
    if (id.length !== 24) {
      return res.status(404).json({ msg: 'This schedule does not exist.' });
    }
    const result = await Scheduling.edit(id, scheduleDate, scheduleTime);
    res.status(200).json(result);
  }

  async closeSchedule(req, res) {
    const { id } = req.params;
    if (id.length !== 24) {
      return res.status(404).json({ msg: 'This schedule does not exist.' });
    }
    const result = await Scheduling.close(id);
    res.status(200).json(result);
  }

  async deleteSchedule(req, res) {
    const { id } = req.params;
    if (id.length !== 24) {
      return res.status(404).json({ msg: 'This schedule does not exist.' });
    }
    const result = await Scheduling.delete(id);
    res.status(200).json(result);
  }
}

export default new SchedulingController();
