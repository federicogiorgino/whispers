const JWT = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
const { SECRET } = require("../config");

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // token = "Bearer" + token
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = JWT.verify(token, SECRET);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired Token");
      }
    }
    throw new Error("Authentication Token must be 'Bearer [token]'");
  }
  throw new Error("Authorization Header must be provided ");
};
