import mongose from 'mongoose';

const postsSchema = new mongose.Schema({
  author: { type: new mongose.Types.ObjectId() },
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: [{
    author: { type: new mongose.Types.ObjectId() },
    content: { type: String, required: true },
  }],
});

const postsModel = mongose.model('Posts', postsSchema);

class Posts {
  async index() {
    try {
      const posts = await postsModel.find();

      return posts;
    } catch (error) {
      return { msg: error.message };
    }
  }

  async create({ ...data }) {
    try {
      const result = await postsModel.create(data);

      return result;
    } catch (error) {
      return { msg: error.message };
    }
  }

  async delete(id) {
    try {
      const result = await postsModel.findByIdAndDelete(id);

      if (!result) return { msg: 'This post does not exist in the database.' };

      return { msg: 'Post deleted successfully.' };
    } catch (error) {
      return { msg: error.message };
    }
  }

  async edit(id, newData) {
    try {
      const currentPost = await postsModel.findById(id);

      if (!currentPost) return { msg: 'This post does not exist in the database.' };

      const uppdatedPost = await postsModel.findByIdAndUpdate(id, { ...newData });

      return uppdatedPost;
    } catch (error) {
      return { msg: error.message };
    }
  }
}

export default new Posts();
