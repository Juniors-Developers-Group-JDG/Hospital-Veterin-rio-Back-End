import User from '../models/Users.js';

class LoginController {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);

      if (user.msg === 'User not found') {
        return res.status(401).json({ error: 'User not found' });
      }

      if (user.msg === 'Incorrect password') {
        return res.status(401).json({ error: 'Incorrect password' });
      }

      // Login successful
      return res.json({ message: 'Login successful', user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new LoginController();
