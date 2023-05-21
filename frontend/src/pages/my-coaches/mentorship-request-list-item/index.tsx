import React from "react";

import { ListItemButton, Button, Chip } from "@mui/material";
import { observer } from "mobx-react-lite";
import { UserName } from "pages/profile/user-name";
import { Coach } from "domain/user/coach/coach";
import { PageListItem } from "components/page-list-item";
import styles from "./styles.module.scss";

interface IProps {
  coach: string;
}

export const MentorshipRequestListItem: React.FC<IProps> = observer(({ coach }) => {

  return (
    <PageListItem className={styles.root}>
      <UserName email={coach} />
      <Chip color="info" label="Waiting for approval"></Chip>
    </PageListItem>
  );
});