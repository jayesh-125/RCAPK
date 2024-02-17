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
export const GetUserByEmail = async (email) => {
  try {
    const result = await axios.get(`${ApiUrl}/user/email=${email}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

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
    const result = await axios.put(`${ApiUrl}/user/${id}`, data);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const GetAllUesrs = async (query) => {
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

export const DeleteFriend = async (id) => {
  try {
    const result = await axios.delete(`${ApiUrl}/user/delete/${id}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

//______________ message ___________________??
export const SendMessageToFriend = async (data) => {
  try {
    const result = await axios.post(`${ApiUrl}/message`, { data });
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const GetAllMessage = async (data) => {
  try {
    const result = await axios.post(`${ApiUrl}/message/all`, { data });
    return result.data;
  } catch (error) {
    throw error;
  }
};
