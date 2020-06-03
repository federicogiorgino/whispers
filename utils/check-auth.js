const JWT = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

const { SECRET } = require("../config");

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1]; //Bearer token convention -->   token is gonna look like "Bearer " + token
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
