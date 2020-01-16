import axios from "axios";
import firstAndLastName from "../utils/firstAndLastName";

export const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export const registerRequest = ({
  email,
  password,
  fullName,
  username,
  primaryLocation
}) => {
  const { firstName, lastName } = firstAndLastName(fullName);
  return axios({
    method: "post",
    url: `${SERVER_URL}/users`,
    data: { email, password, firstName, lastName, username, primaryLocation }
  })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log("ERROR: ", error);
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
      console.log("ERROR: ", error);
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
      console.log("ERROR: ", error);
    });
};

// TODO: upload Avatar will potentially not return any data, remove return res.data
export const uploadAvatarRequest = (avatar, token) => {
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
      return res.data;
    })
    .catch(error => {
      console.log("ERROR: ", error);
    });
};

export const getUserFromUsername = username => {
  return axios({
    method: "get",
    url: `${SERVER_URL}/users/${username}`
  })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log("ERROR: ", error);
    });
};

export const getUserFromToken = token => {
  return axios({
    method: "post",
    url: `${SERVER_URL}/users/userFromToken`,
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

export const loginRequest = formValues => {
  return axios({
    method: "post",
    url: `${SERVER_URL}/users/login`,
    data: { email: formValues.email, password: formValues.password }
  })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log("ERROR: ", error);
      return { user: undefined, token: undefined };
    });
};

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
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.log("ERROR: ", error);
    });
};
