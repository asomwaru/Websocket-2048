import express from "express";
import path from "path";
import { Server } from "http";
import { config } from "dotenv";
import { Server as ioserver } from "socket.io";

interface receiveUpdate {
  id: number;
  board: number[][];
}

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

io.on("connection", (socket) => {
  let room = "room";

  socket.on("waiting", async () => {
    socket.join("waiting");

    let people = await io.in("waiting").allSockets();

    if (people.size >= 2) {
      let oppClient: string = [...people.values()][
        Math.floor(Math.random() * people.size)
      ];

      let opponent = io.sockets.sockets.get(oppClient);

      if (!opponent) {
        throw Error("bad opponent socket");
      }

<<<<<<< HEAD
      // room = Array(6)
      //   .fill(0)
      //   .map(() => Math.floor(Math.random() * 10))
      //   .join("");
=======
      room = Array.apply(null, Array(5))
        .map(() => Math.floor(Math.random() * 10))
        .join("");
>>>>>>> 43155a4788d9486f7ddab513b4a44f9bda30a5fa

      opponent.join(room);
      socket.join(room);

      opponent.leave("waiting");
      socket.leave("waiting");

<<<<<<< HEAD
      // generate a room id

      io.in("room").emit("hello", "world");
=======
      io.in(room).emit("hello", { room });
>>>>>>> 43155a4788d9486f7ddab513b4a44f9bda30a5fa

      console.log("Send id to opponent");
      io.to(oppClient).emit("give_id", { num: 1 });
      socket.emit("give_id", { num: 0 });
    }
  });

  socket.on("joined", () => {
    console.log("Someone has joined");
  });

  socket.on("receive", async (args: receiveUpdate) => {
    socket.broadcast.to(room).emit("update", { opponent: args.board, ...args });
  });

  socket.on("gameover", async ({ id }) => {
    console.log("we got a winner");
    console.log(`winner is ${id}\n`);

    socket.broadcast.to(room).emit("winner", { winner: id });
  });
});

server.listen(port, () => {
  console.log(`Server has started on ${port}`);
});
