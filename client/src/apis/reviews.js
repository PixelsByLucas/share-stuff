import axios from "axios"
import { SERVER_URL } from "./users"

export const getReviewsByUsername = (username) => {
  return axios({
    method: "get",
    url: `${SERVER_URL}/reviews/${username}`
  })
    .then(res => res.data)
    .catch(error => {
      console.log('ERROR getReviewsByUsername', error.message)
    })

}

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