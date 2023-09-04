import Scheduling from '../models/Scheduling.js';
import Users from '../models/Users.js';
import Pets from '../models/Pets.js';

class SchedulingController {
  async getAllSchedules(req, res) {
    const result = await Scheduling.index();
    res.status(200).json(result);
  }

  async createSchedule(req, res) {
    const {
      name, petName, specialty, symptoms, startTime, scheduleDate,
    } = req.body;
    const userBD = await Users.findByName(name);
    if (!userBD) {
      return res.status(404).json({ msg: 'you need to have a registered account to make an appointment.' });
    }
    console.log(userBD);
    const petBD = await Pets.findByName(petName);
    if (!petBD) {
      return res.status(404).json({ msg: 'this pet is not registered in the database.' });
    }
    console.log(petBD.owner[0].name);
    if (petBD.owner[0].name !== name) {
      return res.status(404).json({ msg: 'this pet does not belong to this owner.' });
    }
    try {
      const result = await Scheduling.create(
        userBD,
        petBD.name,

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
