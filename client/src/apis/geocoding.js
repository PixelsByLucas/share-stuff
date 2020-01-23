import axios from "axios";

export const geocode = address => {
  const endpoint = `http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleLine=${address}&f=pjson`;
  return axios({
    method: "get",
    url: endpoint
  })
    .then(res => {
      if (res.status === 200) {
        return res.data.candidates;
      }
    })
    .catch(error => {
      console.log("ERROR in geocode: ", error);
    });
};
