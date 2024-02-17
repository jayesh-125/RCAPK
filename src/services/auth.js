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
