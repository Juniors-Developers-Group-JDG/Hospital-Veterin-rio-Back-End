import User from '../models/Users.js';

class UsersController {
  async getAllUsers(req, res) {
    const result = await User.index();
    res.status(200).json(result);
  }

  async createUser(req, res) {
    const {
      name, email, password, streetAddress, zipCode, phoneNumber,
    } = req.body;
    const result = await User.create(name, email, password, streetAddress, zipCode, phoneNumber);
    return res.status(200).json(result);
  }

  async findById(req, res) {
    const { id } = req.params;

    try {
      const user = await User.findById(id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async findByName(req, res) {
    const { name } = req.params;

    try {
      const user = await User.findByName(name);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const result = await User.delete(id);
      if (!result) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      name, email, password, streetAddress, zipCode, phoneNumber,
    } = req.body;

    try {
      const result = await User.update(
        id,
        name,
        email,
        password,
        streetAddress,
        zipCode,
        phoneNumber,
      );
      if (!result) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json({ message: 'User updated successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UsersController();
