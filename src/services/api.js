import axios from "axios";
import { fb_database } from "../configs/firebase"
import { addDoc, collection, getDocs } from "firebase/firestore";
import { apiUrl } from "../configs/url";

export const ApiUrl = apiUrl("PRODUCTION");

export const SignUpUser = async (data) => {
  try {
    const result = await axios.post(`${ApiUrl}/user/register`, data);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const LoginUser = async (data) => {
  try {
    const response = await axios.post(`${ApiUrl}/user/login`, data);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

//auth user

export const GetUserById = async (id) => {
  try {
    const result = await axios.get(`${ApiUrl}/user/${id}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateUserById = async (id, data) => {
  try {
    const result = await axios.put(`${ApiUrl}/user/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // const result = await axios.put(`${ApiUrl}/user/${id}`, data);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const GetAllUsers = async (query) => {
  try {
    const result = await axios.get(`${ApiUrl}/user/all`, {
      params: { search: query },
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

//_________________friend handle api_____________________??

export const AddFriendUser = async (id, data) => {
  try {
    const response = await axios.post(`${ApiUrl}/user/add/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetAllFriend = async (id) => {
  try {
    const result = await axios.get(`${ApiUrl}/user/get-all-friend/${id}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const DeleteFriend = async (id, friend_id) => {
  try {
    const result = await axios.post(`${ApiUrl}/user/delete/${id}`, {
      friend_id,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

//______________ message ___________________??

export const SendMessageToFriend = async (data) => {
  try {
    await addDoc(collection(fb_database, "chats"), data)
  } catch (error) {
    throw error;
  }
};

export const GetAllMessage = async (data) => {
  try {
    const chatsRef = collection(fb_database, "/chats");
    const querySnapshot = await getDocs(chatsRef);
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    return messages;
  } catch (error) {
    throw error;
  }
};
