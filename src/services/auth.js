import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";

export const CreateUserAuth = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((userCred) => {
      return userCred.user;
    });
    if (!res) {
      throw new Error("response not found.");
    } else {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const SignUserAuth = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password).then(
      (userCred) => {
        return userCred.user;
      }
    );
    if (!res) {
      throw new Error("response not found.");
    }
    return res;
  } catch (error) {
    throw error;
  }
};

export const SignOutUser = async () => {
  try {
    const res = await signOut(auth);
    if (!res) {
      throw new Error("response not found.");
    }
  } catch (error) {
    throw error;
  }
};

// _____________connect with express_______________ //

// export const ApiUrl = import.meta.env.VITE_APP_API_URL;
export const ApiUrl = "http://localhost:3000";

export const SignUpUser = async (data) => {
  try {
    return (await axios.post(`${ApiUrl}/user/register`, data)).data;
  } catch (error) {
    throw error;
  }
};

export const LoginUser = async (data) => {
  try {
    const response = await axios.post(`${ApiUrl}/user/login`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

//auth user
export const GetUserByEmail = async (email) => {
  try {
    return (await axios.get(`${ApiUrl}/user/email=${email}`)).data;
  } catch (error) {
    throw error;
  }
};

export const GetUserById = async (id) => {
  try {
    return (await axios.get(`${ApiUrl}/user/${id}`)).data;
  } catch (error) {
    throw error;
  }
};

export const UpdateUserById = async (id, data) => {
  try {
    return (await axios.put(`${ApiUrl}/user/${id}`, data)).data;
  } catch (error) {
    throw error;
  }
};

export const GetAllUesrs = async (query) => {
  try {
    return (
      await axios.get(`${ApiUrl}/user/all`, { params: { search: query } })
    ).data;
  } catch (error) {
    throw error;
  }
};

export const AddFriendUser = async (data) => {
  try {
    return (await axios.post(`${ApiUrl}/friend`, { data })).data;
  } catch (error) {
    throw error;
  }
};

export const GetAllFriend = async (id) => {
  try {
    return (await axios.get(`${ApiUrl}/friend/${id}`)).data;
  } catch (error) {
    throw error;
  }
};

export const DeleteFriend = async (id) => {
  try {
    return (await axios.delete(`${ApiUrl}/friend/${id}`)).data;
  } catch (error) {
    throw error;
  }
};

//______________ message ___________________

export const SendMessageToFriend = async (data) => {
  try {
    return (await axios.post(`${ApiUrl}/message`, { data })).data;
  } catch (error) {
    throw error;
  }
};

export const GetAllMessage = async (data) => {
  try {
    return (await axios.post(`${ApiUrl}/message/all`, { data })).data;
  } catch (error) {
    throw error;
  }
};
