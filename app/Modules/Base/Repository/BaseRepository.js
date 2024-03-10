class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const document = new this.model(data);
    return document.save();
  }

  async findAll() {
    return this.model.find();
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async update(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}

export default BaseRepository;
