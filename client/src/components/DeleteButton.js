import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Confirm } from "semantic-ui-react";

import { FETCH_POSTS_QUERY } from "../utils/graphQL";

const DeleteButton = ({ postId, callback }) => {
  // semantic ui modal
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    // update() {
    //   setOpenConfirm(false);
    //   //remove post from cache without having to fetch post again
    // },
    // variables: postId,
    update(proxy) {
      setConfirmOpen(false);
      //removes post from cache without fetching all post again
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      const resPosts = data.getPosts.filter((post) => post.id !== postId);
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: [...resPosts] } });
      if (callback) callback();
    },
    variables: {
      postId,
    },
  });

  return (
    <>
      <Button as='div' color='red' floated='right' onClick={() => setConfirmOpen(true)}>
        <Icon name='trash' style={{ margin: 0 }} />
      </Button>
      <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePost} />
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;

// import React, { useState } from "react";
// import gql from "graphql-tag";
// import { useMutation } from "@apollo/react-hooks";
// import { Button, Confirm, Icon } from "semantic-ui-react";

// import { FETCH_POSTS_QUERY } from "../utils/graphQL";

// function DeleteButton({ postId, callback }) {
//   const [confirmOpen, setConfirmOpen] = useState(false);

//   const [deletePost] = useMutation(DELETE_POST_MUTATION, {
//     update(proxy) {
//       setConfirmOpen(false);
//       const data = proxy.readQuery({
//         query: FETCH_POSTS_QUERY,
//       });
//       data.getPosts = data.getPosts.filter((p) => p.id !== postId);
//       proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
//       if (callback) callback();
//     },
//     variables: {
//       postId,
//     },
//   });
//   return (
//     <>
//       <Button as='div' color='red' floated='right' onClick={() => setConfirmOpen(true)}>
//         <Icon name='trash' style={{ margin: 0 }} />
//       </Button>
//       <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePost} />
//     </>
//   );
// }

// const DELETE_POST_MUTATION = gql`
//   mutation deletePost($postId: ID!) {
//     deletePost(postId: $postId)
//   }
// `;

// export default DeleteButton;
