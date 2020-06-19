// https://stackoverflow.com/questions/56717624/socket-io-middle-ware
const socketio = require('socket.io');
let io;

module.exports = {
  init(server) {
    if (io) {
      throw new Error("socket.io already initialized");
    }
    // initalize socket.io to this server
    io = socketio(server);

    // put other socket.io initialization code here

    return io;
  },
  get() {
    if (!io) {
      throw new Error("socket.io has not yet been initialized");
    }
    return io;
  }
}