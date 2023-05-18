import React from "react";

import { ListItemButton, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { UserName } from "pages/profile/user-name";
import { Coach } from "domain/user/coach/coach";
import { PageListItem } from "components/page-list-item";

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
      <UserName email={applicant} />
      <ListItemButton>
        <Button variant="outlined" color="success" onClick={approve}>Approve</Button>
      </ListItemButton>
    </PageListItem>
  );
});