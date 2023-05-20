import React, { useContext } from "react";

import styles from "./styles.module.scss";
import { Avatar, Button, Chip, Paper } from "@mui/material";
import { Coach } from "domain/user/coach/coach";
import { Student } from "domain/user/student";
import { AuthContext } from "common/auth/auth-context";

interface IProps {
  user: Coach | Student;
  openEditingForm: () => void;
}

export const ProfileHeader: React.FC<IProps> = ({ user, openEditingForm }) => {
  const auth = useContext(AuthContext);
  const ownProfile = auth.authenticatedUser().email === user.email;

  return (
    <Paper className={styles.root}>
      <Avatar src={user.avatar()} sx={{ width: 76, height: 76 }}/>
      <span className={styles.name}>{user.name}</span>
      <Chip label={user.role} color="success" sx={{ marginLeft: 2 }} />
      <Chip label={user.location.toString()} color="default" sx={{ marginLeft: 2 }} />
      {ownProfile && <Button variant="outlined" onClick={openEditingForm}>Edit</Button>}
    </Paper>
  );
};