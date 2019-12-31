import axios from "axios";
import { SERVER_URL } from "./users";

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
      return res.data;
    })
    .catch(error => {
      console.log("ERROR: ", error);
    });
};

// export const registerRequest = ({
//   email,
//   password,
//   fullName,
//   username,
//   location
// }) => {
//   const { firstName, lastName } = firstAndLastName(fullName);
//   return axios({
//     method: "post",
//     url: `${SERVER_URL}/users`,
//     data: { email, password, firstName, lastName, username, location }
//   })
//     .then(res => {
//       return res.data;
//     })
//     .catch(error => {
//       console.log("ERROR: ", error);
//     });
// };
