import mongoose from 'mongoose';
import moment from 'moment';
import validateSchedule from '../utils/validateSchedule.js';

const schedulingSchema = new mongoose.Schema({
  name: { type: mongoose.Types.ObjectId, ref: 'User' },
  petName: { type: String, required: true, minlength: [1, 'Enter a name for your pet.'] },
  specialty: { type: String, required: true, minlength: [1, 'Enter a specialty.'] },
  symptoms: { type: String, require: true, minlength: [10, 'Symptoms must be at least 10 characters long'] },
  startTime: { type: Date, required: true },
  closingTime: { type: Date, required: true },
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

  async create(name, petName, specialty, symptoms, startTime, scheduleDate) {
    const schedulesBD = await schedulingModel.find({ scheduleDate });
    if (schedulesBD) {
      if (!validateSchedule(schedulesBD, startTime)) {
        return { msg: 'There is already an appointment scheduled for this time.' };
      }
      try {
        const closingTime = moment(startTime).add(1, 'hour');
        const result = await schedulingModel.create({
          name,
          petName,
          specialty,
          symptoms,
          startTime,
          closingTime,
          scheduleDate,
        });
        return result;
      } catch (error) {
        return { msg: error.message };
      }
    }

    const closingTime = moment(startTime).add(1, 'hour');
    try {
      const result = await schedulingModel.create({
        name,
        petName,
        specialty,
        symptoms,
        startTime,
        closingTime,
        scheduleDate,
      });

      return result;
    } catch (error) {
      return { msg: error.message };
    }
  }

  async close(id) {
    try {
      const closeScheduling = await schedulingModel.findByIdAndUpdate(id, {
        closed: true,
      }, { new: true });
      return closeScheduling;
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
    const schedulesBD = await schedulingModel.find({ scheduleDate: scheduled.scheduleDate });
    if (!validateSchedule(schedulesBD, scheduleNewTime)) {
      return { msg: 'There is already an appointment scheduled for this time.' };
    }
    const closingTime = moment(scheduleNewTime).add(1, 'hour');
    const result = await schedulingModel.findByIdAndUpdate(scheduled.id, {
      scheduleDate: scheduleNewDate,
      startTime: scheduleNewTime,
      closingTime,
    }, { new: true });
    return result;
  }
}

export default new Scheduling();
