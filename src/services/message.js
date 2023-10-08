import { addDoc, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const getUsersData = collection(db, "/users");

//get all datas
export const getMessages = () => {
  const getMessageData = collection(db, "/messages");
  try {
    getDoc(getMessageData).then((data) => {
      return data;
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

//update data by ID
export const updateMessageById = (data) => {
  const updateMessageData = doc(db, "/messages", data.id);
  try {
    updateDoc(updateMessageData).then(() => {
      return { message: "Data update Successfully" };
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

//store messages
export const addMessages = (data) => {
  const addMessageData = collection(db, "/messages");
  try {
    addDoc(addMessageData, data).then(() => {
      return { message: "Data Store Successfully" };
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

//delete data by id
export const deleteMessages = (id) => {
  const deleteMessageData = doc(db, "/messages", id);
  try {
    deleteDoc(deleteMessageData).then((data) => {
      return { message: "Data Delete Successfully" };
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
