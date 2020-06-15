import axios from "axios";
import { SERVER_URL } from "./users";

export const createBorrowRequestAPI = (formData, token) => {
  return axios({
    method: "post",
    url: `${SERVER_URL}/transaction`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res)
    .catch(error => console.log("ERROR createBorrowRequestAPI: ", error));
};

export const editTransactionStatusAPI = (token, id, status) => {
  return axios({
    method: "put",
    url: `${SERVER_URL}/transaction/status/${id}`,
    data: { status },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.data)
    .catch(error => {
      console.log("ERROR", error.message)
    })
}
