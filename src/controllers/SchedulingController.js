import Scheduling from '../models/Scheduling.js';

class SchedulingController {
  async index(req, res) {
    const result = await Scheduling.index();
    res.status(200).json(result);
  }
}

export default new SchedulingController();
