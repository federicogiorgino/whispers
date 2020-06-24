import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";

const Login = (props) => {
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

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      console.log(result.data.login);
      context.login(result.data.login);
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
    loginUser();
  };

  return (
    <div>
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : " "}>
        <h1>Login</h1>
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
          type='password'
          label='Password'
          placeholder='Password'
          name='password'
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type='submit' secondary>
          Login
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

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
