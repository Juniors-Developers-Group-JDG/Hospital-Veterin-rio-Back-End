import Posts from '../models/Posts.js';
import Users from '../models/Users.js';

class PostsController {
  async getAllPosts(req, res) {
    try {
      const result = await Posts.index();

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ msg: 'Bad request.' });
    }
  }

  async createPost(req, res) {
    try {
      const { body } = req;
      const userBD = await Users.findByName(body.author);

      if (!userBD) {
        return res.status(401).json({ msg: 'You need to be logged-in to create a post' });
      }

      const result = await Posts.create(userBD, body);

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ msg: 'Bad Request' });
    }
  }

  async editTitle(req, res) {
    const { title } = req.body;

    const { id } = req.params;

    try {
      const result = await Posts.edit(id, { title });

      if (!result) {
        return res.status(404).json({ msg: 'This post does not exist in the database.' });
      }

      return res.status(200).json('Post retitled successfully.');
    } catch (error) {
      return res.status(400).json({ msg: 'Bad Request' });
    }
  }

  async editContent(req, res) {
    const { content } = req.body;

    const { id } = req.params;

    try {
      const result = await Posts.edit(id, { content });

      if (!result) {
        return res.status(404).json({ msg: 'This post does not exist in the database.' });
      }

      return res.status(200).json('Post content updated successfully.');
    } catch (error) {
      return res.status(400).json({ msg: 'Bad Request' });
    }
  }

  async addNewComment(req, res) {
    const { comment } = req.body;

    const { id } = req.params;

    try {
      const result = await Posts.put(id, 'comments', comment);

      if (!result) {
        return res.status(404).json({ msg: 'This post does not exist in the database.' });
      }

      return res.status(200).json('New comment added successfully.');
    } catch (error) {
      return res.status(400).json({ msg: 'Bad Request' });
    }
  }

  async deletePost(req, res) {
    const { id } = req.params;

    try {
      const result = await Posts.delete(id);

      if (!result) return res.status(404).json({ msg: 'This post does not exist in the database.' });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ msg: 'Bad Request' });
    }
  }
}

export default new PostsController();
