import mongoose from 'mongoose';
import moment from 'moment';

const scheduledAppointments = new mongoose.Schema({
  // name: { type: String, required: true, minlength: [3, 'Digite um nome para o seu pet.'] },
  appointmentId: {
    type: mongoose.Types.ObjectId,
    ref: 'Scheduling',
  },
  date: { type: Date, required: true },
  hours: {
    type: [
      {
        _id: false,
        startTime: Date,
        closingTime: Date,
      },
    ],
  },
  marked: { type: Number, required: true, default: 0 },

}, { timestamps: true });

const schedulingAppnModel = mongoose.model('ScheduledAppointments', scheduledAppointments);

class ScheduledAppointments {
  async create(id, date, startTime) {
    const isDate = await schedulingAppnModel.findOne({ date });
    if (isDate) {
      const newArray = isDate.hours;

      console.log(typeof (newArray));

      return;
    }
    const closingTime = moment(startTime).add(2, 'hour');
    try {
      const result = await schedulingAppnModel.create({
        appointmentId: id,
        date,
        hours: {
          startTime,
          closingTime,
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
