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
export const GETUSERSFROMDATABASE = async () => {
  const getUsersData = collection(db, "users");
  try {
    const querySnapshot = await getDocs(getUsersData);
    const userData = querySnapshot.docs.map((doc) => doc.data());
    return userData;
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

export const GETUSERBYIDFROMDATABASE = async (id) => {
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
export const UPDATEUSERBYIDINDATABASE = (data) => {
  const updateUserData = doc(db, "users", data.id);
  try {
    updateDoc(updateUserData);
    return { message: "User update Successfully" };
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

//store new data
export const ADDUSERINDATABASE = (data) => {
  const addUserData = collection(db, "users");
  try {
    addDoc(addUserData, data)
      return { message: "User Store Successfully" };
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

//delete data by id
export const DELETEUSERFROMDATABASE = (id) => {
  const deleteUserData = doc(db, "users", id);
  console.log(id);
  try {
    deleteDoc(deleteUserData)
      return { message: "User Delete Successfully" };
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
