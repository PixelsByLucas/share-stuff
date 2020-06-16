import axios from "axios"
// import firstAndLastName from "../utils/firstAndLastName";

export const SERVER_URL = process.env.VUE_APP_SERVER_URL

export const registerRequest = formData => {
  return axios({
    method: "post",
    url: `${SERVER_URL}/users`,
    data: formData
  })
    .then(res => {
      return res.data
    })
    .catch(error => {
      console.log("ERROR: ", error)
    })
}

export const uniqueEmailRequest = email => {
  return axios({
    method: "post",
    url: `${SERVER_URL}/users/email`,
    data: { email }
  })
    .then(res => {
      return res.data
    })
    .catch(error => {
      console.log("ERROR: ", error)
    })
}

export const uniqueUsernameRequest = username => {
  return axios({
    method: "post",
    url: `${SERVER_URL}/users/username`,
    data: { username }
  })
    .then(res => {
      return res.data
    })
    .catch(error => {
      console.log("ERROR: ", error)
    })
}

export const getUserFromUsername = username => {
  return axios({
    method: "get",
    url: `${SERVER_URL}/users/${username}`
  })
    .then(res => {
      return res.data
    })
    .catch(error => {
      console.log("ERROR: ", error)
    })
}

export const getUserFromToken = token => {
  return axios({
    method: "post",
    url: `${SERVER_URL}/users/userFromToken`,
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

export const loginRequest = formValues => {
  return axios({
    method: "post",
    url: `${SERVER_URL}/users/login`,
    data: { email: formValues.email, password: formValues.password }
  })
    .then(res => {
      return res.data
    })
    .catch(error => {
      console.log("ERROR: ", error)
      return { user: undefined, token: undefined }
    })
}

export const logoutRequest = token => {
  return axios({
    method: "post",
    url: `${SERVER_URL}/users/logout`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if (res.status === 200) {
        return true
      } else {
        return false
      }
    })
    .catch(error => {
      console.log("ERROR: ", error)
    })
}

export const updateUser = (primaryLocation, token) => {
  return axios({
    method: "post",
    url: `${SERVER_URL}/users/logout`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      primaryLocation
    }
  })
    .then(res => {
      return res.data
    })
    .catch(error => {
      console.log("ERROR in updateUser request: ", error)
    })
}
