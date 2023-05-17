import React from "react";

import styles from "./styles.module.scss";

import ListItem from "@mui/material/ListItem";
import { ListItemButton, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useNavigate, generatePath } from "react-router-dom";
import { AppRoute } from "common/enums/app-route.enum";
import { UserName } from "pages/profile/user-name";
import { CoachStudent } from "domain/user/coach/coach-student";

interface IProps {
  student: CoachStudent;
}

export const StudentListItem: React.FC<IProps> = observer(({ student }) => {
  const navigate = useNavigate();

  const sendMessage = () => {
    navigate(generatePath(AppRoute.COMMUNITY, { id: student.chat }));
  };

  return (
    <ListItem alignItems="flex-start" classes={{ "root": styles.root }}>
      <UserName email={student.email} />
      <ListItemButton>
        <Button variant="outlined" onClick={sendMessage}>Send message</Button>
      </ListItemButton>
    </ListItem>
  );
});