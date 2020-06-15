import axios from "axios";
import { SERVER_URL } from "./users";

export const editNotificationStatusAPI = (token, id) => {
  return axios({
    method: "put",
    url: `${SERVER_URL}/notification/status/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      return res.data
    })
    .catch(error => {
      console.log("ERROR", error.message)
    })
};
