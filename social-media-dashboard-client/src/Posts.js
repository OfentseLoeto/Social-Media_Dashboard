import React, { useEffect, useState } from 'react';
import { firestore } from './firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { auth } from './firebase';


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = await getDocs(collection(firestore, 'posts'));
        setPosts(postsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        setError('Error fetching posts: ' + error.message);
      }
    };

    fetchPosts();
  }, []);
  
  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        title,
	content,
	createdAt: new Date(),
	userId: auth.currentUser.uid,
	userEmail: auth.currentUser.email,
      };
      await addDoc(collection(firestore, 'posts'), newPost);
      setPosts([newPost, ...posts]);
      setTitle('');
      setContent('');
    } catch (error) {
      setError('Error creating post: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <form onSubmit={handleCreatePost}>
        <input
	  type="text"
	  spaceholder="Title"
	  value={title}
	  onChange={(e) => setTitle(e.target.value)}
	  required
        />
	<textarea
          spaceholder="Content"
	  value={content}
	  onChange={(e) => setContent(e.target.value)}
	  required
	/>
	<button type="submit">Create Post</button>
      </form>
      {error && <p>{error}</p>}
      {posts.map((post, index) => (
        <div key={index}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
	  <p>Posted by: {post.userEmail}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
