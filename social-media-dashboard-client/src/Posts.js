import React, { useEffect, useState } from 'react';
import { firestore } from './firebase';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = await firestore.collection('posts').get();
      setPosts(postsCollection.docs.map(doc => doc.data()));
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post, index) => (
        <div key={index}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
