import React, { useState, useContext } from "react";
import { Page } from "components/page";
import { Button, TextField } from "@mui/material";
import usersService from "api/users.service";
import { AuthContext } from "common/auth/auth-context";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const auth = useContext(AuthContext);

  const login = async () => {
    try {
      const user = await usersService.login(email, password);
      auth.login(user, password);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Page>
      <TextField id="email" label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} />
      <TextField id="password" label="Password" variant="outlined" value={password} onChange={e => setPassword(e.target.value)} />
      <Button onClick={login}>Login</Button>
    </Page>
  );
};