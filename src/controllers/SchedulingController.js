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
    try {
      const result = await Scheduling.create(name, petName, symptoms, scheduleTime, scheduleDate);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ msg: 'Erro na requisição' });
    }
  }

  async reschedule(req, res) {
    const { id } = req.params;
    const { scheduleDate, scheduleTime } = req.body;
    if (id.length !== 24) {
      return res.status(404).json({ msg: 'Essa consulta não existe.' });
    }

    const result = await Scheduling.edit(id, scheduleDate, scheduleTime);
    if (!result) {
      return res.status(404).json({ msg: 'Essa consulta não existe no banco de dados' });
    }
    res.status(200).json({ msg: 'Consulta reagendada' });
  }

  async deleteSchedule(req, res) {
    const { id } = req.params;
    if (id.length !== 24) {
      return res.status(404).json({ msg: 'Essa consulta não existe.' });
    }
    const result = await Scheduling.delete(id);
    res.status(200).json(result);
  }
}

export default new SchedulingController();
