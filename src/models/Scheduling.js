import mongoose from 'mongoose';

const schedulingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  petName: { type: String, required: true },
  scheduleTime: { type: Date, required: true },
  scheduledDate: { type: Date, required: true },

}, { timestamps: true });

const schedulingModel = mongoose.model('Scheduling', schedulingSchema);

class Scheduling {
  async index() {
    const teste = {
      name: 'luix',
      petName: 'oliver',
      scheduleTime: new Date().getHours(),
      scheduledDate: new Date(),
    };
    try {
      const firstData = await schedulingModel.create(teste);
      return firstData;
    } catch (error) {
      console.log(error);
      return { msg: 'Erro desconhecido, tente novamente.' };
    }
  }
}

export default new Scheduling();
