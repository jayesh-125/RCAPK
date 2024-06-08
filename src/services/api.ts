import axios from "axios";
import { fb_database } from "../configs/firebase"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { setFriendList } from "../redux/userSlice";
import { setAuthUser } from "../redux/authSlice";
import { setMessageList } from "../redux/messageSlice";
import { startLoading, stopLoading } from "../redux/loaderSlice";


const appMode: any = {
    DEVELOPMENT: "http://localhost:3000",
    PRODUCTION: "https://chat-api-five.vercel.app",
}

const apiUrl = (mode: string) => {
    return appMode[mode]
}

const token = localStorage.getItem("TOKEN")

// export const ApiUrl = apiUrl("DEVELOPMENT");
export const ApiUrl = apiUrl("PRODUCTION");

export const SignUpUser = async (data: any, dispatch: any) => {
    try {
        dispatch(startLoading())
        const result = await axios.post(`${ApiUrl}/auth/register`, data);
        if (result.data.status) {
            dispatch(stopLoading())
        }
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const LoginUser = async (data: any, dispatch: any) => {
    try {
        dispatch(startLoading())
        const result = await axios.post(`${ApiUrl}/auth/login`, data);
        if (result.data.status) {
            localStorage.setItem("TOKEN", result.data.token);
            dispatch(setAuthUser(result.data.data));
            dispatch(stopLoading());
        }
        return result?.data;
    } catch (error) {
        throw error;
    }
};

//auth user
export const GetUserById = async (id: string, dispatch: any) => {
    try {
        dispatch(startLoading())
        const result = await axios.get(`${ApiUrl}/user/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        if (result.data.status) {
            dispatch(setAuthUser(result?.data?.data));
            dispatch(stopLoading())
        }
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const UpdateUserById = async (id: string, data: any, dispatch: any) => {
    try {
        dispatch(startLoading())
        const result = await axios.put(`${ApiUrl}/user/${id}`, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        if (result.data.status) {
            dispatch(setAuthUser(result?.data?.data));
            dispatch(stopLoading())
        }
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const GetAllUsers = async (query: any, dispatch: any) => {
    try {
        dispatch(startLoading())
        const result = await axios.get(`${ApiUrl}/user/all`, {
            params: { search: query },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (result.data.status) {
            dispatch(stopLoading())
        }
        return result.data;
    } catch (error) {
        throw error;
    }
};

//_________________friend handle api_____________________??

export const AddFriendUser = async (id: string, data: any, dispatch: any) => {
    try {
        dispatch(startLoading())
        const result = await axios.post(`${ApiUrl}/user/add/${id}`, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (result?.data.status) {
            dispatch(stopLoading())
        }
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const GetAllFriend = async (id: string, data: any, dispatch: any) => {
    try {
        dispatch(startLoading())
        const result = await axios.post(`${ApiUrl}/user/get-all-friend/${id}`, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (result?.data?.status) {
            dispatch(setFriendList(result?.data?.data))
            dispatch(stopLoading())
            return result.data;
        }
    } catch (error) {
        throw error;
    }
};

export const DeleteFriend = async (id: string, friend_id: string, dispatch: any) => {
    try {
        dispatch(startLoading())
        const result = await axios.post(`${ApiUrl}/user/delete/${id}`,
            {
                friend_id: friend_id,
            },
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        if (result?.data.status) {
            dispatch(setAuthUser(result?.data?.data))
            dispatch(stopLoading())
        }
        return result.data;
    } catch (error) {
        throw error;
    }
};

//______________ message ___________________??

export const SendMessageToFriend = async (data: any, dispatch: any) => {
    try {
        dispatch(startLoading())
        await addDoc(collection(fb_database, "chats"), data)
        const { createdAt, ...passData } = data;
        dispatch(setMessageList((prev: any) => [...prev, passData]));
        dispatch(stopLoading())
    } catch (error) {
        throw error;
    }
};

export const GetAllMessage = async (id: any, fid: any, dispatch: any) => {
    try {
        const chatsRef = collection(fb_database, "/chats");
        const q1 = query(chatsRef,
            where("fromUserId", "==", id),
            where("toUserId", "==", fid)
        );
        const q2 = query(chatsRef,
            where("fromUserId", "==", fid),
            where("toUserId", "==", id)
        );
        const querySnapshot1 = await getDocs(q1);
        const querySnapshot2 = await getDocs(q2);
        const messages: any[] = [];

        querySnapshot1.forEach((doc: any) => {
            messages.push({ id: doc.id, ...doc.data() });
        });
        querySnapshot2.forEach((doc: any) => {
            messages.push({ id: doc.id, ...doc.data() });
        });

        const response: any[] = messages.length > 0 ? messages?.map((a: any) => {
            return {
                ...a,
                createdAt: new Date(
                    a?.createdAt.seconds * 1000 + a?.createdAt.nanoseconds / 1000000
                ).toISOString(),
            };
        }) : [];

        dispatch(setMessageList(response))

        return messages;
    } catch (error) {
        throw error;
    }
};
