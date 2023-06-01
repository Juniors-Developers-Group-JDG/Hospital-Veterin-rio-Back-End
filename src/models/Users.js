import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: [3, 'O nome precisa ter no minimo 3 caracteres'] },
  email: { type: String, required: true, minlength: [5, 'O email precisa ter no minimo 5 caracteres'] },
  password: { type: String, required: true, minlength: [5, 'O senha precisa ter no minimo 6 caracteres'] },
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);

class User {
  async index() {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      return { msg: error.message };
    }
  }

  async create(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const result = await userModel.create({
        name,
        email,
        password: hashedPassword,
      });
      return result;
    } catch (error) {
      return { msg: error.message };
    }
  }

  async findById(id) {
    try {
      const user = await userModel.findById(id);
      return user;
    } catch (error) {
      return { msg: error.message };
    }
  }

  async findByName(name) {
    try {
      const user = await userModel.findOne({ name });
      return user;
    } catch (error) {
      return { msg: error.message };
    }
  }

  async delete(id) {
    try {
      const result = await userModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      return { msg: error.message };
    }
  }

  async update(id, name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const result = await userModel.findByIdAndUpdate(id, {
        name,
        email,
        password: hashedPassword,
      });
      return result;
    } catch (error) {
      return { msg: error.message };
    }
  }

  async login(email, password) {
    try {
      const user = await userModel.findOne({ email });

      if (!user) {
        return { msg: 'User not found' };
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return { msg: 'Incorrect password' };
      }

      return { msg: 'Login successful', user };
    } catch (error) {
      return { msg: error.message };
    }
  }
}

export default new User();
