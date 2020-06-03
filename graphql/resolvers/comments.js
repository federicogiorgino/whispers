const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Mutation: {
    // @CREATECOMMENT Comment a post
    createComment: async (parent, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },

    //@DELETECOMMENT Deletes a personal comment on a post
    deleteComment: async (parent, { postId, commentId }, context) => {
      //gets the username from the checkAuth helper
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        //gets the corresponding index of the post
        const commentIndex = post.comments.findIndex((comment) => comment.id === commentId);
        //if the username of the post at the commentIndex equals the username from auth(owner of the comment)
        if (post.comments[commentIndex].username === username) {
          //removes the comment from the comments array
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Forbidden Action");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};
