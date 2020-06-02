const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const { SECRET } = require("../../config");
const User = require("../../models/User");

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      ctx,
      info
    ) {
      //TODO Validation
      //TODO Check user does not exist
      //TODO hash PW and auth token creation
      password = await bcrypt.hash(password, 12);
      // creates a new instance of User with the properties we input
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });
      // saves the user to the database
      const res = await newUser.save();

      const token = JWT.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET,
        { expiresIn: "1h" }
      );

      return {
        ...res._doc,
        id: res.id,
        token,
      };
    },
  },
};
