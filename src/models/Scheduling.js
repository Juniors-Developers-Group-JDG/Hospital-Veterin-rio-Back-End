import mongoose from 'mongoose';

const schedulingSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: [2, 'O nome precisa ter no minimo 3 caracteres'] },
  petName: { type: String, required: true, minlength: [1, 'Digite um nome para o seu pet.'] },
  symptoms: { type: String, require: true, minlength: [10, 'Os sintomas precisam ter no minimo 10 caracteres'] },
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
      return result;
    } catch (error) {
      return { msg: error.message };
    }
  }

  async delete(id) {
    try {
      const result = await schedulingModel.findByIdAndDelete(id);
      if (!result) return { msg: 'Essa consulta não existe no banco de dados' };
      return { msg: 'Consulta cancelada com sucesso.' };
    } catch (error) {
      return { msg: error.message };
    }
  }

  async edit(id, scheduleNewDate, scheduleNewTime) {
    const scheduled = await schedulingModel.findById(id);
    if (!scheduled) return { msg: 'Essa consulta não existe no banco de dados' };
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
