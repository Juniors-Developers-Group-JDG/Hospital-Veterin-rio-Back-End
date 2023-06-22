import Pet from '../models/Pets.js';

class PetController {
  async index(req, res) {
    try {
      const pets = await Pet.index();
      res.status(200).json(pets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    const {
      name, age, breed, weight, owner, species,
    } = req.body;
    const pet = await Pet.create(name, age, breed, weight, owner, species);
    res.status(201).json(pet);
  }

  async findById(req, res) {
    try {
      const { id } = req.params;
      const pet = await Pet.findById(id);
      if (!pet) {
        res.status(404).json({ message: 'Pet not found' });
      } else {
        res.status(200).json(pet);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        name, age, breed, weight, owner, species,
      } = req.body;
      const pet = await Pet.update(id, name, age, breed, weight, owner, species);
      if (!pet) {
        res.status(404).json({ message: 'Pet not found' });
      } else {
        res.status(200).json(pet);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const pet = await Pet.delete(id);
      if (!pet) {
        res.status(404).json({ message: 'Pet not found' });
      } else {
        res.status(200).json({ message: 'Pet deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new PetController();
