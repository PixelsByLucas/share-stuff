import axios from "axios";
import firstAndLastName from "../utils/firstAndLastName";

const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export const registerRequest = ({
  email,
  password,
  fullName,
  username,
  location
}) => {
  const { firstName, lastName } = firstAndLastName(fullName);
  return axios({
    method: "post",
    url: `${SERVER_URL}/users`,
    data: { email, password, firstName, lastName, username, location }
  })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      throw error;
    });
};

export const uniqueEmailRequest = email => {
  return axios({
    method: "post",
    url: `${SERVER_URL}/users/email`,
    data: { email }
  })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      throw error;
    });
};

export const uniqueUsernameRequest = username => {
  return axios({
    method: "post",
    url: `${SERVER_URL}/users/username`,
    data: { username }
  })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      throw error;
    });
};

export const uploadAvatar = (avatar, token) => {
  return axios({
    method: "post",
    url: `${SERVER_URL}/users/me/avatar`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    },
    data: avatar
  })
    .then(res => {
      console.log("axios res:", res);
      return res.data;
    })
    .catch(error => {
      throw error;
    });
};
