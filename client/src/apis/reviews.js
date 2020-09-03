import axios from "axios"
import { SERVER_URL } from "./users"

//TODO: finish this API and build a corresponding route on the back end 

export const setUserReviewAPI = (token, payload) => {
  return axios({
    method: "post",
    url: `${SERVER_URL}/review`,
    data: payload,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.data)
    .catch(error => {
      console.log("ERROR setUserReviewAPI: ", error.message)
    })
}