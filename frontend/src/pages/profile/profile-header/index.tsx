import React, { useContext } from "react";

import styles from "./styles.module.scss";
import { Avatar, Button, Chip, Paper } from "@mui/material";
import { Coach } from "domain/user/coach/coach";
import { Student } from "domain/user/student";
import { AuthContext } from "common/auth/auth-context";
import coachesService from "api/coaches.service";

interface IProps {
  user: Coach | Student;
  openEditingForm: () => void;
}

export const ProfileHeader: React.FC<IProps> = ({ user, openEditingForm }) => {
  const auth = useContext(AuthContext);
  const ownProfile = auth.authenticatedUser()?.email === user.email;
  const requestMentorship = !ownProfile && user.role.toLowerCase() === "coach";

  const applyForMentorship = async () => {
    await coachesService.requestMentorship(user.email);
  };

  return (
    <Paper className={styles.root}>
      <Avatar src={user.avatar()} sx={{ width: 76, height: 76 }}/>
      <span className={styles.name}>{user.name}</span>
      <Chip label={user.role} color="success" sx={{ marginLeft: 2 }} />
      <Chip label={user.location.toString()} color="default" sx={{ marginLeft: 2 }} />
      {ownProfile && <Button variant="outlined" onClick={openEditingForm}>Edit</Button>}
      {requestMentorship && <Button variant="outlined" onClick={applyForMentorship}>Apply for mentorship</Button>}
    </Paper>
  );
};