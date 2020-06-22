import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";

import Post from "../components/Post";

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  console.log(data);

  return (
    <Grid columns={1}>
      <Grid.Row>
        {loading ? (
          <h2>Loading all posts.</h2>
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: "2rem" }}>
              <Post post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;
