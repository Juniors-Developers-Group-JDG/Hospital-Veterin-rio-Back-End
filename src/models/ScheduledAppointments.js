import mongoose from 'mongoose';
import moment from 'moment';
import validateSchedule from '../utils/validateSchedule.js';

const scheduledAppointments = new mongoose.Schema({
  // name: { type: String, required: true, minlength: [3, 'Digite um nome para o seu pet.'] },
  appointmentId: {
    type: mongoose.Types.ObjectId,
    ref: 'Scheduling',
  },
  date: { type: Date, required: true },
  hours: {
    type: [{
      _id: false,
      startTime: { type: Date },
      closingTime: { type: Date },
    }],
  },
  marked: { type: Number, required: true, default: 0 },

}, { timestamps: true });

const schedulingAppnModel = mongoose.model('ScheduledAppointments', scheduledAppointments);

class ScheduledAppointments {
  async create(id, date, startTime) {
    // CONSULTO SE JÁ TEM ESSA DATA NO BANCO DE DATAS AGENDADAS
    const isDate = await schedulingAppnModel.findOne({ date });
    if (isDate) {
      if (!validateSchedule(isDate.hours, startTime)) {
        return { msg: 'erro' };
      }
      const closingTime = moment(startTime).add(1, 'hour');
      const newArray = isDate.hours;
      newArray.push({
        startTime,
        closingTime,
      });

      const att = await schedulingAppnModel.findByIdAndUpdate(isDate._id, {
        hours: newArray,
      });
      return att;
    }
    const closingTime = moment(startTime).add(1, 'hour');
    try {
      const result = await schedulingAppnModel.create({
        appointmentId: id,
        date,
        hours: {
          startTime,
          closingTime,
          hours: {
            startTime,
            closingTime: new Date(),
          },
        },
        marked: 1,

      });
      return result;
    } catch (error) {
      return { msg: error.message };
    }
  }
}

export default new ScheduledAppointments();
