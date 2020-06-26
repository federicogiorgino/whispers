import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FETCH_POSTS_QUERY } from "../utils/graphQL";

const CreatePost = (props) => {
  const [values, setValues] = useState({ body: "" });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      const newPost = result.data.createPost;
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [newPost, ...data.getPosts] },
      });
      values.body = "";
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    createPost();
  };
  return (
    <>
      <Form onSubmit={onSubmit} className='postbar'>
        <Form.Field className='postbar-input'>
          <Form.Input
            style={{ height: "30px" }}
            type='text'
            placeholder='Hello I am new here'
            name='body'
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type='submit' color='red'>
            New post
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className=' ui error message'>
          <ul className='list'>
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
};

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default CreatePost;
