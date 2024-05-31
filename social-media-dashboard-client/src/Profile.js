import React, { useState, useEffect } from 'react';
import { firestore, auth } from './firebase';

const Profile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const profileDoc = await firestore.collection('users').doc(auth.currentUser.uid).get();
      setProfile(profileDoc.data());
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { displayName, bio } = profile;
    await firestore.collection('users').doc(auth.currentUser.uid).update({ displayName, bio });
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <input type="text" value={profile.displayName || ''} onChange={(e) => setProfile({ ...profile, displayName: e.target.value })} placeholder="Display Name" />
        <textarea value={profile.bio || ''} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} placeholder="Bio"></textarea>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
