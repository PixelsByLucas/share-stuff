import axios from "axios"
import { SERVER_URL } from "./users"

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
      return res.data
    })
    .catch(error => {
      console.log("ERROR: ", error)
    })
}

export const getItemsByOwner = id => {
  return axios({
    method: "get",
    url: `${SERVER_URL}/items/user/${id}`
  })
    .then(res => {
      return res.data
    })
    .catch(error => {
      console.log("ERROR:", error)
    })
}

export const searchItemsAPI = (...params) => {
  let queryString = params.reduce((result, query) => {
    const queryKey = Object.keys(query)[0]

    if (query[queryKey]) {
      const symbol = result.includes("?") ? "&" : "?"
      result += `${symbol}${queryKey}=${query[queryKey]}`
    }

    return result
  }, "")

  return axios({
    method: "get",
    url: `${SERVER_URL}/items/search${queryString}`
  })
    .then(res => {
      return res.data
    })
    .catch(error => {
      console.log("ERROR", error)
    })
}

export const getItemAPI = id => {
  return axios({
    method: "get",
    url: `${SERVER_URL}/items/${id}`
  })
    .then(res => {
      return res.data
    })
    .catch(error => {
      console.log("ERROR", error)
    })
}
