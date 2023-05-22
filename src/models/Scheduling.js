import mongoose from 'mongoose';

const schedulingSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: [5, 'O nome precisa ter no minimo 3 caracteres'] },
  petName: { type: String, required: true },
  symptoms: { type: String, require: true, minlength: [10, 'Os sintomas precisam ter no minimo 10 caracteres'] },
  scheduleTime: {
    type: Date,
    required: true,
  },
  scheduleDate: { type: Date, required: true },

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
        scheduleTime: new Date(),
        scheduleDate,
      });
      return result;
    } catch (error) {
      console.log(error);
      return { msg: error.message };
    }
  }
}

export default new Scheduling();
