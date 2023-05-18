import React from "react";

import { ListItemButton, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useNavigate, generatePath } from "react-router-dom";
import { AppRoute } from "common/enums/app-route.enum";
import { UserName } from "pages/profile/user-name";
import { CoachStudent } from "domain/user/coach/coach-student";
import { PageListItem } from "components/page-list-item";

interface IProps {
  student: CoachStudent;
}

export const StudentListItem: React.FC<IProps> = observer(({ student }) => {
  const navigate = useNavigate();

  const sendMessage = () => {
    navigate(generatePath(AppRoute.CHAT, { id: student.chat }));
  };

  return (
    <PageListItem>
      <UserName email={student.email} />
      <ListItemButton>
        <Button variant="outlined" onClick={sendMessage}>Send message</Button>
      </ListItemButton>
    </PageListItem>
  );
});