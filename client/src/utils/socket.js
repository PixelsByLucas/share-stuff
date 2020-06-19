import store from "../store"
import io from "socket.io-client";

const SERVER_URL = process.env.VUE_APP_SERVER_URL
let socket

export const socketConnect = (token) => {
  socket = io(`${SERVER_URL}?token=${token}`)
  initListeners()
}

export const socketDisconnect = () => {
  socket.emit('logout')
}

const initListeners = () => {
  socket.on('new notification', (notification) => {
    store.dispatch("socketNotification", notification)
  })
}