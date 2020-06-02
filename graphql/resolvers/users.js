const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { SECRET } = require("../../config");
const { validateRegisterInput, validateLoginInput } = require("../../utils/validators");
const User = require("../../models/User");

const generateToken = (user) => {
  return JWT.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET,
    { expiresIn: "1h" }
  );
};

module.exports = {
  Mutation: {
    async register(parent, { registerInput: { username, email, password, confirmPassword } }) {
      // Validation
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // Check user does not exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username already taken", {
          errors: {
            username: "Username is taken",
          },
        });
      }

      // hash PW and auth token creation
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

      // generate token
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },

    async login(parent, { username, password }) {
      const { valid, errors } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        errors.general = "Wrong Credentials";
        throw new UserInputError("Wrong Credentials", { errors });
      }
      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
