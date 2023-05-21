import React from "react";

import ListItemText from "@mui/material/ListItemText";
import { Button, Chip, ListItemButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { PageListItem } from "components/page-list-item";
import { FairCoach } from "domain/fair/FairCoach";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

import styles from "./styles.module.scss";
import coachesService from "api/coaches.service";
import studentsService from "api/students.service";

interface IProps {
  coach: FairCoach;
}

export const CoachListItem: React.FC<IProps> = observer(({ coach }) => {
  // const request = async () => {
  //   await studentsService.
  // }

  return (
    <PageListItem className={styles.root}>
      <ListItemText
        primary={coach.email}
      />
      <Button variant="outlined">Request</Button>
      <div className={styles.communities}>
        {coach.communities.map(community => (
          <Chip key={community} label={community} variant="filled" color="success" sx={{ marginLeft: 1 }} />
        ))}
        <div className={styles.recommended}>
          {coach.recommended !== undefined && (
            coach.recommended ? <ThumbUpIcon color="success" /> : <ThumbDownIcon color="warning" />
          )}
        </div>
      </div>
    </PageListItem>
  );
});