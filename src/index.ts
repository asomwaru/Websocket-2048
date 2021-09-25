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

let root = path.join(__dirname, "public");
app.use("/static", express.static(root));

app.get("/", (_, res) => {
  res.sendFile(root + "/index.html");
});

io.sockets.on("connection", (socket) => {
  socket.on("waiting", async () => {
    socket.join("waiting");

    let people = await io.in("waiting").allSockets();

    if (people.size >= 2) {
      let opponent: any = [...people.values()][
        Math.floor(Math.random() * people.size)
      ];

      try {
        opponent = io.sockets.sockets.get(opponent);

        if (!opponent) {
          throw Error("bad opponent socket");
        }

        opponent.join("room");
        socket.join("room");

        opponent.leave("room");
        socket.leave("room");

        io.in("room").emit("hello", "world");
      } catch (err) {
        console.error(err);
      }
    }
  });

  socket.on("joined", () => {
    console.log("Someone has joined");
  });
});

server.listen(port, () => {
  console.log(`Server has started on ${port}`);
});
