module.exports.validateRegisterInput = (username, email, password, confirmPassword) => {
  const errors = {};
  //username checks
  if (username.trim() === "") errors.username = "Username must not be empty";
  //email checks
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const emailRegEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(emailRegEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  //password and confirmPassword checks
  if (password === "") {
    errors.password = "Password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Password must match";
  }

  return { errors, valid: Object.keys(errors).length < 1 };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  //username checks
  if (username.trim() === "") errors.username = "Username must not be empty";
  //password checks
  if (password === "") errors.password = "Password must not be empty";

  return { errors, valid: Object.keys(errors).length < 1 };
};
