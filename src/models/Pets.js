import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: [3, 'O nome precisa ter no minimo 3 caracteres'] },
  age: { type: Number, required: true, minlength: [1, 'A idade precisa ter no minimo 1 caracteres'] },
  breed: { type: String, required: true, minlength: [3, 'A raça precisa ter no minimo 3 caracteres'] },
  weight: { type: Number, required: true, minlength: [1, 'O peso precisa ter no minimo 1 caracteres'] },
  owner: { type: String, required: true, minlength: [3, 'O nome do dono precisa ter no minimo 3 caracteres'] },
  species: { type: String, required: true, minlength: [3, 'A espécie precisa ter no minimo 3 caracteres'] },
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

  async create(name, age, breed, weight, owner, species) {
    try {
      const result = await petModel.create({
        name,
        age,
        breed,
        weight,
        owner,
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

  async update(id, name, age, breed, weight, owner, species) {
    try {
      const pet = await petModel.findByIdAndUpdate(id, {
        name,
        age,
        breed,
        weight,
        owner,
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
