import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

// Function to get messages between two users
export const GETMESSAGESFROMDATABASE = async ({ FromId, ToID }) => {
  const messagesCollection = collection(db, "messages");

  try {
    if (FromId) {
      const fromUserQuery = query(
        messagesCollection,
        where("from_user_id", "==", FromId)
      );
      const fromUserSnapshot = await getDocs(fromUserQuery);
      return fromUserSnapshot.docs.map((doc) => doc.data());
    }

    if (ToID) {
      const toUserQuery = query(
        messagesCollection,
        where("to_user_id", "==", ToID)
      );
      const toUserSnapshot = await getDocs(toUserQuery);
      return toUserSnapshot.docs.map((doc) => doc.data());
    }

    const allUserSnapshot = await getDoc(messagesCollection);
    return allUserSnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    throw error;
  }
};

//update data by ID
export const UPDATERELATIONFORMDATABASE = (data) => {
  const updateMessageData = doc(db, "/messages", data.id);
  try {
    updateDoc(updateMessageData);
    return { message: "Message update Successfully" };
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

//store messages
export const ADDNEWRELATIONFROMDATABASE = (data) => {
  const addMessageData = collection(db, "/messages");
  try {
    addDoc(addMessageData, data);
    return { message: "Message Send Successfully" };
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

//delete data by id
export const DELETERELATIONFROMDATABSE = (id) => {
  const deleteMessageData = doc(db, "/messages", id);
  try {
    deleteDoc(deleteMessageData);
    return { message: "Message Delete Successfully" };
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
