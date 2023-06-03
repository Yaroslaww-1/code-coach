import React from "react";

import { ListItemButton, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { UserName } from "pages/profile/user-name";
import { Coach } from "domain/user/coach/coach";
import { PageListItem } from "components/page-list-item";

import styles from "./styles.module.scss";

interface IProps {
  applicant: string;
  coach: Coach;
}

export const MentorshipRequestListItem: React.FC<IProps> = observer(({ applicant, coach }) => {
  const approve = () => {
    coach.approveMentorship(applicant);
  };

  return (
    <PageListItem>
      <div className={styles.root}>
        <UserName email={applicant} />
        <div className={styles.actions}>
          <Button variant="outlined" color="success" onClick={approve}>Approve</Button>
        </div>
      </div>
    </PageListItem>
  );
});