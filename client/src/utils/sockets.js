import io from "socket.io-client";
const SERVER_URL = process.env.VUE_APP_SERVER_URL
let socket

export const socketConnect = (token) => {
  socket = io(`${SERVER_URL}?token=${token}`)
  console.log('SOCKET CONNECT SUCCESSFUL', socket)
}