import mongoose from 'mongoose';
import moment from 'moment';
import validateSchedule from '../utils/validateSchedule.js';

const scheduledAppointments = new mongoose.Schema({
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
      // FUNÇÃO PARA VALIDAÇÃO DA HORA E DE HORÁRIOS DISPONIVEIS
      if (isDate.marked >= 5) {
        return { msg: 'There are no more appointment times available for that day.' };
      }
      if (!validateSchedule(isDate.hours, startTime, isDate.marked)) {
        return { msg: 'There is already an appointment scheduled for this time.' };
      }
      // ADICIONANDO UMA HORA AO HORÁRIO FINAL DA CONSULTA
      const closingTime = moment(startTime).add(1, 'hour');
      const newArray = isDate.hours;
      newArray.push({
        startTime,
        closingTime,
      });

      await schedulingAppnModel.findByIdAndUpdate(isDate._id, {
        hours: newArray,
        marked: isDate.marked + 1,
      });
      return { msg: 'Scheduled appointment!' };
    }

    // SE NÃO TIVER UMA DATA JÁ CADASTRADA CADASTRA UMA NOVA

    // ADICIONANDO UMA HORA AO HORÁRIO FINAL DA CONSULTA
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
            closingTime,
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
