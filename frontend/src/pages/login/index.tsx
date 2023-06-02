import React, { useState, useContext } from "react";
import { Page } from "components/page";
import { Button, TextField } from "@mui/material";
import usersService from "api/users.service";
import { AuthContext } from "common/auth/auth-context";
import { generatePath, useNavigate } from "react-router-dom";
import { AppRoute } from "common/enums/app-route.enum";
import { PageForm } from "components/page-form";

import styles from "./styles.module.scss";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const login = await usersService.login(email, password);
      if (login) {
        await auth.login(email, password);
        navigate(generatePath(AppRoute.BASE));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const register = () => {
    navigate(generatePath(AppRoute.REGISTER));
  };

  return (
    <PageForm className={styles.root}>
      <h1>Welcome back!</h1>
      <TextField id="email" label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} className={styles.input} />
      <TextField id="password" label="Password" type="password" variant="outlined" value={password} onChange={e => setPassword(e.target.value)} className={styles.input} />
      <div className={styles.actions}>
        <Button onClick={login} className={styles.login} color="primary">Login</Button>
        <Button onClick={register} className={styles.register} color="secondary">Register</Button>
      </div>
    </PageForm>
  );
};