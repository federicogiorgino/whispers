const { AuthenticationError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    // @GETPOSTS get all posts
    async getPosts() {
      try {
        // finds all posts in the database
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    // @GETPOST get one specific post
    async getPost(parent, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    // @CREATEPOST Creates a post
    async createPost(parent, { body }, context) {
      //checks if the user is authorized to post
      const user = checkAuth(context);

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      return post;
    },

    // @DELETEPOST Deletes a post
    async deletePost(parent, { postId }, context) {
      //checks if the user is authorized to post
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted with success";
        } else {
          throw new AuthenticationError("Forbidden Action");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
