export const GetDataFromLocal = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const RemoveDataFromLocal = (key) => {
  return localStorage.removeItem(key);
};

export const GetDataFromSession = (key) => {
  return JSON.parse(sessionStorage.getItem(key));
};

export const RemoveDataFromSession = (key) => {
  return sessionStorage.removeItem(key);
};