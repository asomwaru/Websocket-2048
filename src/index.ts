import express from "express";
import path from "path";
import { Server } from "http";
import { config } from "dotenv";
import { Server as ioserver } from "socket.io";

config();

const port: number = parseInt(`${process.env.PORT}`) | 8080;
const app = express();
const server = new Server(app);
const io = new ioserver(server);

let root = path.join(__dirname, 'public');
app.use("/static", express.static(root));

app.get('/', (req, res) => {
    res.sendFile(root + "/index.html")
});


io.sockets.on("connection", (socket) => {
    socket.join("waiting");
});

server.listen(port, () => {
    console.log(`Server has started on ${port}`);
});
