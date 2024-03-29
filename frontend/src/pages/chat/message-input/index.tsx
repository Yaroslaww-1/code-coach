import React, { useContext, useState } from "react";

import styles from "./styles.module.scss";

import { observer } from "mobx-react-lite";
import { Chat } from "domain/chat/Chat";
import { TextField, Button } from "@mui/material";
import { AuthContext } from "common/auth/auth-context";
import { Paper } from "components/paper";

interface IProps {
  chat: Chat;
}

export const MessageInput: React.FC<IProps> = observer(({ chat }) => {
  const auth = useContext(AuthContext);
  const [message, setMessage] = useState<string>("");

  const sendMessage = () => {
    chat.send(message, auth.authenticatedUser().email);
  };

  return (
    <Paper className={`${styles.root}`}>
      <TextField
        id="message-input1"
        label="Message text"
        variant="standard"
        className={styles.input}
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <Button variant="outlined" onClick={sendMessage}>Send</Button>
    </Paper>
  );
});