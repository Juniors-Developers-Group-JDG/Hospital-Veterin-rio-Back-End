import mongoose from 'mongoose';

const postsSchema = new mongoose.Schema({
  author: { type: mongoose.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true, minlength: [1, "Enter post's title"] },
  content: { type: String, required: true, minlength: [1, "Enter post's content"] },
  comments: [{
    _id: false,
    author: { type: mongoose.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
  }],
});

const postsModel = mongoose.model('Posts', postsSchema);

class Posts {
  async index() {
    try {
      const posts = await postsModel.find();

      return posts;
    } catch (error) {
      return { msg: error.message };
    }
  }

  async create(user, { ...data }) {
    try {
      const result = await postsModel.create({
        author: user,
        title: data.title,
        content: data.content,
        comments: [{
          author: user,
          content: data.coments[0].content,
        }],
      });

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

      const updatedPost = await postsModel.findByIdAndUpdate(id, { ...newData });

      return updatedPost;
    } catch (error) {
      return { msg: error.message };
    }
  }

  async put(id, column, newData) {
    try {
      const currentPost = await postsModel.findById(id);

      if (!currentPost) return { msg: 'This post does not exist in the database.' };

      const updatedPost = await postsModel
        .findByIdAndUpdate(id, {
          [column]: [newData, currentPost[column]],
        });

      return updatedPost;
    } catch (error) {
      return { msg: error.message };
    }
  }
}

export default new Posts();
