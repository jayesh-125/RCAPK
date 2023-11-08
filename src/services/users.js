import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

//get all datas
export const getUsers = async () => {
  const getUsersData = collection(db, "users");
  try {
    const querySnapshot = await getDocs(getUsersData);
    const userData = querySnapshot.docs.map((doc) => doc.data());
    return userData;
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

export const getUserByPerameter = async (id) => {
  const getUsersData = doc(db, "users", id);
  try {
    getDoc(getUsersData).then((data) => {
      return data;
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

//update data by ID
export const updateUserById = (data) => {
  const updateUserData = doc(db, "users", data.id);
  try {
    updateDoc(updateUserData).then(() => {
      return { message: "Data update Successfully" };
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

//store new data
export const addUsers = (data) => {
  const addUserData = collection(db, "users");
  try {
    addDoc(addUserData, data).then(() => {
      return { message: "Data Store Successfully" };
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

//delete data by id
export const deleteUser = (id) => {
  const deleteUserData = doc(db, "users", id);
  try {
    deleteDoc(deleteUserData).then((data) => {
      return { message: "Data Delete Successfully" };
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
