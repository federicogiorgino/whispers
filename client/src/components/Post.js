import React, { useContext } from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";

const Post = ({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) => {
  const context = useContext(AuthContext);
  const { user } = context;

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content>
        <LikeButton user={user} post={{ id, likes, likeCount }} />

        <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
          <Button color='green' basic>
            <Icon name='comments' />
          </Button>
          <Label as='div' basic color='green' pointing='left'>
            {commentCount}
          </Label>
        </Button>
        {/* Checks if logged in and if the username of the post creator equals the logged in user */}
        {user && user.username === username && (
          <Button
            as='div'
            color='red'
            floated='right'
            onClick={() => {
              console.log("post deleted");
            }}
          >
            <Icon name='trash' style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

export default Post;