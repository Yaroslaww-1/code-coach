import React from "react";

import { ListItemButton, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useNavigate, generatePath } from "react-router-dom";
import { AppRoute } from "common/enums/app-route.enum";
import { UserName } from "pages/profile/user-name";
import { CoachStudent } from "domain/user/coach/coach-student";
import { PageListItem } from "components/page-list-item";
import styles from "./styles.module.scss";

interface IProps {
  coach: CoachStudent;
}

export const CoachListItem: React.FC<IProps> = observer(({ coach }) => {
  const navigate = useNavigate();

  const sendMessage = () => {
    navigate(generatePath(AppRoute.CHAT, { id: coach.chat }));
  };

  return (
    <PageListItem className={styles.root}>
      <UserName email={coach.coach} />
      <ListItemButton sx={{ maxWidth: 180 }}>
        <Button variant="outlined" onClick={sendMessage}>Send message</Button>
      </ListItemButton>
    </PageListItem>
  );
});