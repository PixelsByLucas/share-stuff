import axios from "axios";
import { SERVER_URL } from "./users";

export const getNotificationsAPI = token => {
  return axios({
    method: "get",
    url: `${SERVER_URL}/notifications`,
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
