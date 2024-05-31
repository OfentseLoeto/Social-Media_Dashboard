import { firestore } from './firebase';

// Add data
export const addData = async (collection, data) => {
  try {
    const docRef = await firestore.collection(collection).add(data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

// Get data
export const getData = async (collection) => {
  try {
    const snapshot = await firestore.collection(collection).get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};

// Update data
export const updateData = async (collection, id, data) => {
  try {
    await firestore.collection(collection).doc(id).update(data);
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

// Delete data
export const deleteData = async (collection, id) => {
  try {
    await firestore.collection(collection).doc(id).delete();
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};
