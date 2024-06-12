import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDRhMFXLWyRHeaKyicffw6xUrmpZhs6EDE",
  authDomain: "nice-pen-345814.firebaseapp.com",
  projectId: "nice-pen-345814",
  storageBucket: "nice-pen-345814.appspot.com",
  messagingSenderId: "765267466203",
  measurementId: "G-B0218QF80Q",
  appId: "1:765267466203:web:6f82f260202f2f0b87f9fe",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const db = getFirestore(app);

// Create user document
const createUserDocument = async (user) => {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    email: user.email,
    username: user.username,
    profilePicture: user.profilePicture || "",
    bio: user.bio || "",
    followerCount: 0,
    followingCount: 0
  });

};

// Add new post
const addPost = async (post) => {
  const postsRef = collection(db, "posts");
  await addDoc(postsRef, {
    userId: post.userId,
    content: post.content,
    imageUrl: post.imageUrl || '',
    timestamp: new Date(),
    likesCount: 0
  });
};

// Add a comment to a post
const addComment = async (postId, comment) => {
  const postRef = doc(db, "posts", postId);
  const commentsRef = collection(postRef, "comments");
  await addDoc(commentsRef, {
    userId: comment.userId,
    comment: comment.text,
    timestamp: new Date()
  });
};

// Add a follower
const addFollower = async (userId, followerId) => {
  const followersRef = collection(db, "followers");
  await addDoc(followersRef, {
    userId: userId,
    followerId: followerId
  });
};

// Add a like to a post
const addLike = async (postId, userId) => {
  const likesRef = collection(db, "likes");
  await addDoc(likesRef, {
    postId: postId,
    userId: userId
  });
};

export { auth, firestore, db, createUserDocument, addPost, addComment, addFollower, addLike };
