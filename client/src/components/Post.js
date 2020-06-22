import React from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

const Post = ({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) => {
  const likePost = () => {
    console.log("Post liked");
  };

  const commentPost = () => {
    console.log("Post commented");
  };
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
        <Button as='div' labelPosition='right' onClick={likePost}>
          <Button color='red'>
            <Icon name='heart' />
          </Button>
          <Label as='a' basic color='red' pointing='left'>
            {likeCount}
          </Label>
        </Button>
        <Button as='div' labelPosition='right' onClick={commentPost}>
          <Button color='green'>
            <Icon name='comments' />
          </Button>
          <Label as='a' basic color='green' pointing='left'>
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default Post;
