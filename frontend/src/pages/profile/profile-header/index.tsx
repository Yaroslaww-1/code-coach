import React from "react";

import styles from "./styles.module.scss";
import { Avatar, Chip, Paper } from "@mui/material";
import { Coach } from "domain/user/coach/coach";
import { Student } from "domain/user/student";

interface IProps {
  user: Coach | Student;
}

export const ProfileHeader: React.FC<IProps> = ({ user }) => {
  return (
    <Paper className={styles.root}>
      <Avatar src={user.avatar()} sx={{ width: 76, height: 76 }}/>
      <span className={styles.name}>{user.name}</span>
      <Chip label={user.role} color="success" sx={{ marginLeft: 2 }} />
      <Chip label={user.location.toString()} color="default" sx={{ marginLeft: 2 }} />
    </Paper>
  );
};