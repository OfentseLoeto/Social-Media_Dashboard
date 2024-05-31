import { auth } from './firebase';

// Sign up function
export const signUp = async (email, password) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up: ", error);
    throw error;
  }
};

// Sign in function
export const signIn = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error;
  }
};

// Sign out function
export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
};
