import jwt from 'jsonwebtoken';
import { Resend } from 'resend';
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
    const { name, email, password } = req.body;

    try {
      const result = await User.update(id, name, email, password);
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
    const emailExists = await User.findByEmail(email);
    if (!emailExists) return res.status(500).json({ error: 'Email not found' });
    const secret = '122124';
    const payload = {
      name: emailExists.name,
      email: emailExists.email,
    };
    const token = jwt.sign(payload, secret, { expiresIn: '2h' });
    const link = `http://localhost:3000/resetpassword/${emailExists.id}/${token}`;

    const resend = new Resend('re_hhTmtY9S_A9izkcxd4krNkHcCp8rzCUDz');

    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'veterinariobackend@gmail.com',
      subject: 'Hello World',
      html: `<p>Segue o link para a recuperação de senha ${link}</p>`,
    });
    res.json({ msg: 'o link foi enviado' });
  }

  async resetPassword(req, res) {
    const { id, token } = req.params;
    const userExists = await User.findById(id);
    if (!userExists) {
      res.send('Invlaid Id');
    }
    const secret = '122124';
    const payload = jwt.verify(token, secret);
    res.render('recoverPassword.ejs');
  }
}

export default new UsersController();
