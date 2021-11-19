import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import config from "config";

import socket from "./socket";
import { randomName } from "./utils/randomName";

const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', corsOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

app.get("/", (_, res) =>
  res.send('Server is up and running...')
);

app.get("/public/login", (_, res) =>
  res.status(200).json({name: `${randomName()}`})
);

httpServer.listen(port, host, () => {
  console.log(`http://${host}:${port}`);

  socket({ io });
});