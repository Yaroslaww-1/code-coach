import { io } from "socket.io-client";

const ws = io("ws://localhost:8001", { transports: ["websocket"] });

export default ws;
