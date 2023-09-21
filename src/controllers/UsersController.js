import jwt from 'jsonwebtoken';
// import { Resend } from 'resend';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import User from '../models/Users.js';
import emailSender from '../utils/emailSender.js';

config();
class UsersController {
  async getAllUsers(req, res) {
    const result = await User.index();
    res.status(200).json(result);
  }

  async createUser(req, res) {
    const {
      name, email, password, streetAddress, zipCode, phoneNumber,
    } = req.body;

    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const result = await User.create(
      name,
      email,
      hashedPassword,
      streetAddress,
      zipCode,
      phoneNumber,
    );
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

  async patch(req, res) {
    const { id } = req.params;
    const { body } = req;

    const { name } = body;

    try {
      const user = (await User.findById(id)).toObject();

      const result = await User.update(
        ...user,
        id,
        name,
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

  async forgotPassword(req, res) {
    const { email } = req.body;
    try {
      const userExists = await User.findByEmail(email);
      if (!userExists) return res.status(500).json({ error: 'Email not found.' });
      const jwtSecret = process.env.JWT_SECRET;
      const secret = jwtSecret + userExists.password;
      const payload = {
        name: userExists.name,
        email: userExists.email,
      };
      const token = jwt.sign(payload, secret, { expiresIn: '2h' });
      const link = `https://jdg-site-vet.onrender.com/resetpassword/${userExists.id}/${token}`;
      const send = await emailSender(email, link);
      if (send) {
        res.status(200).json({ msg: 'Message sent successfully.' });
      }
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: 'Error sending message.' });
    }
  }

  async resetPassword(req, res) {
    const { id, token } = req.params;
    const userExists = await User.findById(id);
    if (!userExists) {
      res.status(404).json({ msg: 'Invalid id.' });
    }
    const jwtSecret = process.env.JWT_SECRET;
    const secret = jwtSecret + userExists.password;

    try {
      const payload = jwt.verify(token, secret);
      res.render('recoverPassword.ejs', { payload });
    } catch (error) {
      res.status(401).json({ msg: error.message });
    }
  }

  async changePassword(req, res) {
    const { id, token } = req.params;
    const { password, password2 } = req.body;

    const userExists = await User.findById(id);
    if (!userExists) {
      res.status(404).json({ msg: 'Invalid id.' });
    }
    if (password !== password2) {
      return res.status(400).json({ msg: 'The passwords are not the same.' });
    }
    const jwtSecret = process.env.JWT_SECRET;
    const secret = jwtSecret + userExists.password;
    try {
      jwt.verify(token, secret);
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await User.updatePassword(userExists.id, hashedPassword);
      res.json(result);
    } catch (error) {
      res.status(401).json({ msg: error.message });
    }
  }
}

export default new UsersController();
