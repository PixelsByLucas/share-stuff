import axios from "axios"
import { SERVER_URL } from "./users"

export const editNotificationStatusAPI = (token, id) => {
  return axios({
    method: "put",
    url: `${SERVER_URL}/notification/status/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.data)
    .catch(error => {
      console.log("ERROR", error.message)
    })
}

export const editReturnStatusAPI = (token, id, itemReturned) => {
  return axios({
    method: "put",
    url: `${SERVER_URL}/notifications/return/${id}`,
    data: { itemReturned },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.data)
    .catch(error => {
      console.log("ERROR editReturnStatusAPI: ", error.message)
    })
}

export const deleteNotificationAPI = (token, id) => {
  return axios({
    method: "delete",
    url: `${SERVER_URL}/notification/status/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.data)
    .catch(error => {
      console.log("ERROR", error.message)
    })
}
