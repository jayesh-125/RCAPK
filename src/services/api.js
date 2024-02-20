import axios from "axios";
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
