export const GetDataFromLocal = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const RemoveUserFromLocal = ()=>{
  return localStorage.removeItem("user")
}