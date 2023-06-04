import { io } from "socket.io-client";

const ws = io(process.env.REACT_APP_WS_URL || "ws://localhost:8001", { transports: ["websocket"] });

export default ws;
