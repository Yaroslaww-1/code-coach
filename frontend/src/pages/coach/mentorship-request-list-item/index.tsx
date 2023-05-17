import React from "react";

import styles from "./styles.module.scss";

import ListItem from "@mui/material/ListItem";
import { ListItemButton, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { UserName } from "pages/profile/user-name";
import { Coach } from "domain/user/coach/coach";

interface IProps {
  applicant: string;
  coach: Coach;
}

export const MentorshipRequestListItem: React.FC<IProps> = observer(({ applicant, coach }) => {
  const approve = () => {
    coach.approveMentorship(applicant);
  };

  return (
    <ListItem alignItems="flex-start" classes={{ "root": styles.root }}>
      <UserName email={applicant} />
      <ListItemButton>
        <Button variant="outlined" color="success" onClick={approve}>Approve</Button>
      </ListItemButton>
    </ListItem>
  );
});