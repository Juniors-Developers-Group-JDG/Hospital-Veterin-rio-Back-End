import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  owner: {
    ownerID: { type: mongoose.Types.ObjectId, ref: 'User' },
    name: { type: String },
    email: { type: String },
  },
  name: { type: String, required: true, minlength: [3, 'O nome precisa ter no minimo 3 caracteres'] },
  age: { type: Number, required: true, minlength: [1, 'A idade precisa ter no minimo 1 caracteres'] },
  breed: { type: String, required: false, minlength: [3, 'A raça precisa ter no minimo 3 caracteres'] },
  weight: { type: Number, required: true, minlength: [1, 'O peso precisa ter no minimo 1 caracteres'] },
  species: { type: String, required: false, minlength: [3, 'A espécie precisa ter no minimo 3 caracteres'] },
}, { timestamps: true });

const petModel = mongoose.model('Pet', petSchema);

class Pet {
  async index() {
    try {
      const pets = await petModel.find();
      return pets;
    } catch (error) {
      return { msg: error.message };
    }
  }

  async create(owner, name, age, breed, weight, species) {
    try {
      const ownerBD = {
        _id: owner._id,
        name: owner.name,
        email: owner.email,
      };
      const result = await petModel.create({
        name,
        age,
        breed,
        weight,
        owner: ownerBD,
        species,
      });
      return result;
    } catch (error) {
      return { msg: error.message };
    }
  }

  async findById(id) {
    try {
      const pet = await petModel.findById(id);
      return pet;
    } catch (error) {
      return { msg: error.message };
    }
  }

  async findByName(name) {
    try {
      const pet = await petModel.find({ name }).populate('owner.ownerID');
      return pet;
    } catch (error) {
      return { msg: error.message };
    }
  }

  async update(id, name, age, breed, weight, species) {
    try {
      const pet = await petModel.findByIdAndUpdate(id, {
        name,
        age,
        breed,
        weight,
        species,
      });
      return pet;
    } catch (error) {
      return { msg: error.message };
    }
  }

  async delete(id) {
    try {
      const pet = await petModel.findByIdAndDelete(id);
      return pet;
    } catch (error) {
      return { msg: error.message };
    }
  }
}

export default new Pet();
