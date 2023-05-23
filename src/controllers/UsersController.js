import User from '../models/Users.js';

class UsersController {
  async getAllUsers(req, res) {
    const result = await User.index();
    res.status(200).json(result);
  }

  async createUser(req, res) {
    const {
      name, email, password,
    } = req.body;
    const result = await User.create(name, email, password);
    return res.status(200).json(result);
  }
}

export default new UsersController();
