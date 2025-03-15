const http = require("http");
const express = require("express");
const app = express();
const port = process.env.PORT || 5500;
const server = http.createServer(app);
const socketIo = require("socket.io")(server);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/html/index.html");
});
socketIo.addListener("connection", () => {
  console.log("conect");
});
app.use(express.static("public"));
server.listen(port);
