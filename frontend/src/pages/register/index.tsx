import React, { useState } from "react";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import usersService from "api/users.service";
import { generatePath, useNavigate } from "react-router-dom";
import { AppRoute } from "common/enums/app-route.enum";
import { PageForm } from "components/page-form";

import styles from "./styles.module.scss";

export const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("student");
  const navigate = useNavigate();

  const register = async () => {
    try {
      const register = await usersService.register(email, password, role);
      if (!register?.error) navigate(generatePath(AppRoute.LOGIN));
    } catch (e) {
      console.error(e);
    }
  };

  const login = () => {
    navigate(generatePath(AppRoute.LOGIN));
  };

  return (
    <PageForm className={styles.root}>
      <h1>Welcome!</h1>
      <TextField id="email" label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} className={styles.input} />
      <TextField id="password" label="Password" variant="outlined" value={password} onChange={e => setPassword(e.target.value)} className={styles.input} />
      <Select
        className={styles.input}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={role}
        label="Age"
        onChange={e => setRole(e.target.value)}
      >
        <MenuItem value={"student"}>Student</MenuItem>
        <MenuItem value={"coach"}>Coach</MenuItem>
      </Select>
      <div className={styles.actions}>
        <Button onClick={register} className={styles.register} color="primary">Register</Button>
        <Button onClick={login} className={styles.login} color="secondary">Login</Button>
      </div>
    </PageForm>
  );
};