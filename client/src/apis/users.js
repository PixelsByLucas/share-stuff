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
  console.log(process.env.VUE_APP_SERVER_URL);
  const { firstName, lastName } = firstAndLastName(fullName);
  return axios({
    method: "post",
    url: `${SERVER_URL}/users`,
    data: { email, password, firstName, lastName, username, location }
  })
    .then(res => {
      console.log(res);

      return res.data;
    })
    .catch(error => {
      console.log(error);
    });
};
