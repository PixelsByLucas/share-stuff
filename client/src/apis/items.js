import axios from "axios";
import { SERVER_URL } from "./users";

export const createItem = (formData, token) => {
  return axios({
    method: "post",
    url: `${SERVER_URL}/items`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log("ERROR: ", error);
    });
};

export const getItemsByOwner = id => {
  return axios({
    method: "get",
    url: `${SERVER_URL}/items/user/${id}`
  })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log("ERROR:", error);
    });
};

export const getAllItemsAPI = () => {
  return axios({
    method: "get",
    url: `${SERVER_URL}/items`
  })
    .then(res => {
      return res.data
    })
    .catch(error => {
      console.log("ERROR", error)
    })
}
