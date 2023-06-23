import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: [3, 'Name must be at least 10 characters long'] },
  email: { type: String, required: true, minlength: [5, 'Emails must be at least 10 characters long'] },
  password: { type: String, required: true, minlength: [5, 'Password must be at least 10 characters long'] },
  streetAddress: { type: String, required: true, minlength: [5, 'Street Adrress must be at least 10 characters long'] },
  zipCode: { type: String, required: true, minlength: [5, 'Zipcode must be at least 10 characters long'] },
  phoneNumber: { type: String, required: true, minlength: [5, 'Phone number must be at least 10 characters long'] },
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

  async create(name, email, password, streetAddress, zipCode, phoneNumber) {
    try {
      console.log(name);
      const result = await userModel.create({
        name,
        email,
        password,
        streetAddress,
        zipCode,
        phoneNumber,
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

  async findByEmail(email) {
    try {
      const user = await userModel.findOne({ email });
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

  async update(id, name, email, password, streetAddress, zipCode, phoneNumber) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const result = await userModel.findByIdAndUpdate(id, {
        name,
        email,
        password: hashedPassword,
        streetAddress,
        zipCode,
        phoneNumber,
      });
      return result;
    } catch (error) {
      return { msg: error.message };
    }
  }

  async updatePassword(id, password) {
    try {
      await userModel.findByIdAndUpdate(id, { password });
      return { msg: 'Password changed successfully.' };
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
