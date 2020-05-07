import axios from "axios";
import { SERVER_URL } from "./users";

export const createBorrowRequestAPI = (formData, token) => {
  return axios({
    method: "post",
    url: `${SERVER_URL}/transactions`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.status(200).end())
    .catch(error => console.log('ERROR createBorrowRequestAPI: ', error))
}