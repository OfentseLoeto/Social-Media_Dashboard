import React, { useState, useEffect } from 'react';
import { firestore, auth } from './firebase';

const Follow = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await firestore.collection('users').get();
      setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
    };

    fetchUsers();
  }, []);

  const handleFollow = async (userId) => {
    const { uid } = auth.currentUser;
    await firestore.collection('followers').add({
      followerId: uid,
      followingId: userId
    });
  };

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.data.displayName}</h3>
          <button onClick={() => handleFollow(user.id)}>Follow</button>
        </div>
      ))}
    </div>
  );
};

export default Follow;
