const conn = require("./database").connection;
const query = require("./database").executeQuery;
const routes = require("./routes");
const cors = require("cors");
const passport = require("passport");
const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const { JWTStrategy } = require("./jwtStrategy");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  formatMessage,
} = require("./utils").userService;

conn.connect((e) => {
  if (e) console.log(e);
});

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

app.use(express.json({ limit: "10kb" }));

passport.use(JWTStrategy);

app.use(passport.initialize());

app.use("/auth", routes.authRouter);

app.get("/", (req, res, next) => {
  res.json({ message: "success" });
});

app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const result = await query("select * from users");
      console.log(result);
      res.end();
    } catch (e) {
      console.log(e);
    }
  }
);

io.on("connection", (socket) => {
  socket.on("join", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // przywitanie użytkownika
    socket.emit("message", formatMessage("Chat bot", "Welcome to ChatCord!"));

    // Oznajmianie gdy użytkownik dołączy
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage("Chat bot", `${user.username} has joined the chat`)
      );

    // wysyłanie info o userach
    io.to(user.room).emit("groupData", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on("sendMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Gdy klient się rozłącza
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage("Chat bot", `${user.username} has left the chat`)
      );

      // wysyłanie info o userach
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

server.listen("3001", () => {
  console.log("App is running on port 3001");
});
