import React, { useContext, Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import { FETCH_POSTS_QUERY } from "../utils/graphQL";

import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import Banner from "../components/Banner";
import Spinner from "../components/Spinner";

const Home = () => {
  const context = useContext(AuthContext);
  const { user } = context;
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <div style={{ marginTop: "70px" }}>
      {user ? (
        <Fragment>
          <CreatePost />
          {loading ? (
            <Spinner style={{ width: "300px" }} />
          ) : (
            <Grid columns={1}>
              <Grid.Row>
                <Transition.Group>
                  {data.getPosts &&
                    data.getPosts.map((post) => (
                      <Grid.Column key={post.id} style={{ marginBottom: "2rem" }}>
                        <Post post={post} />
                      </Grid.Column>
                    ))}
                </Transition.Group>
                )
              </Grid.Row>
            </Grid>
          )}
        </Fragment>
      ) : (
        <Banner />
      )}
    </div>
  );
};

export default Home;
