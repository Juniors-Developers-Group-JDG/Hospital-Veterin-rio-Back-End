import mongoose from 'mongoose';
import ScheduledAppointments from './ScheduledAppointments.js';

const schedulingSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: [1, 'Enter your name'] },
  petName: { type: String, required: true, minlength: [1, 'Enter a name for your pet.'] },
  symptoms: { type: String, require: true, minlength: [10, 'Symptoms must be at least 10 characters long'] },
  scheduleTime: {
    type: Date,
    required: true,
  },
  scheduleDate: { type: Date, required: true },
  closed: { type: Boolean, default: false, required: true },

}, { timestamps: true });

const schedulingModel = mongoose.model('Scheduling', schedulingSchema);

class Scheduling {
  async index() {
    try {
      const schedules = await schedulingModel.find();
      return schedules;
    } catch (error) {
      return { msg: error.message };
    }
  }

  async create(name, petName, symptoms, scheduleTime, scheduleDate) {
    try {
      const result = await schedulingModel.create({
        name,
        petName,
        symptoms,
        scheduleTime,
        scheduleDate,
      });

      const isScheduled = await ScheduledAppointments.create(
        result._id,
        result.scheduleDate,
        result.scheduleTime,
      );
      if (isScheduled) return isScheduled;

      return result;
    } catch (error) {
      return { msg: error.message };
    }
  }

  async delete(id) {
    try {
      const result = await schedulingModel.findByIdAndDelete(id);
      if (!result) return { msg: 'This schedule does not exist in the database.' };
      return { msg: 'Appointment cancel with successful.' };
    } catch (error) {
      return { msg: error.message };
    }
  }

  async edit(id, scheduleNewDate, scheduleNewTime) {
    const scheduled = await schedulingModel.findById(id);
    if (!scheduled) return { msg: 'This schedule does not exist in the database.' };
    try {
      const newScheduled = await schedulingModel.findByIdAndUpdate(id, {
        scheduleDate: scheduleNewDate,
        scheduleTime: scheduleNewTime,
      });
      return newScheduled;
    } catch (error) {
      return { msg: error.message };
    }
  }
}

export default new Scheduling();
