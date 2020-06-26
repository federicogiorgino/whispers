import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";

const Register = (props) => {
  const context = useContext(AuthContext);
  //hooks
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //onChange
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      context.login(result.data.register);
      //once registered redirects to homepage
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  //onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  return (
    <div style={{ marginTop: "70px" }}>
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : " "}>
        <h1>Register</h1>
        <Form.Input
          type='text'
          label='Username'
          placeholder='Username'
          name='username'
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          type='text'
          label='Email'
          placeholder='Email'
          name='email'
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />
        <Form.Input
          type='password'
          label='Password'
          placeholder='Password'
          name='password'
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Form.Input
          type='password'
          label='Confirm Password'
          placeholder='Confirm Password'
          name='confirmPassword'
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type='submit' secondary>
          Register
        </Button>
      </Form>
      {/* checks if there is any error in the errors array */}
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {/* maps through the errors array and displays each one */}
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
