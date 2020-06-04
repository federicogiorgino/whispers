const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    // @GETPOSTS get all posts
    getPosts: async () => {
      try {
        // finds all posts in the database
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    // @GETPOST get one specific post
    getPost: async (parent, { postId }) => {
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
    createPost: async (parent, { body }, context) => {
      //checks if the user is authorized to post
      const user = checkAuth(context);

      if (args.body.trim() === "") {
        throw new Error("Post must not be empty");
      }
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      context.pubsub.publish("NEW_POST", { newPost: post });

      return post;
    },

    // @DELETEPOST Deletes a post
    deletePost: async (parent, { postId }, context) => {
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

    //@LIKEPOST Likes a post
    likePost: async (parent, { postId }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        //if post is liked already => unlike it
        if (post.likes.find((like) => like.username === username)) {
          //sets the likes array to a filtered array containing all the likes except the one matching the username
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          //if post is not like yet => like it
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: (parent, args, { pubsub }) => {
        return pubsub.asyncIterator("NEW_POST");
      },
    },
  },
};
