import React, { useContext, Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import { FETCH_POSTS_QUERY } from "../utils/graphQL";

import Post from "../components/Post";
import CreatePost from "../components/CreatePost";

const Home = () => {
  const context = useContext(AuthContext);
  const { user } = context;
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <div style={{ marginTop: "70px" }}>
      {user && <CreatePost />}

      <Grid columns={1}>
        <Grid.Row>
          {loading ? (
            <h2>Loading all posts.</h2>
          ) : (
            <Transition.Group>
              {data.getPosts &&
                data.getPosts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: "2rem" }}>
                    <Post post={post} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;
