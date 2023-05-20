import React from "react";

import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Chip, ListItemButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useNavigate, generatePath } from "react-router-dom";
import { AppRoute } from "common/enums/app-route.enum";
import { CommunityJoinButton } from "pages/community/community-join-button";
import { PageListItem } from "components/page-list-item";
import { FairCoach } from "domain/fair/FairCoach";

import styles from "./styles.module.scss";

interface IProps {
  coach: FairCoach;
}

export const CoachListItem: React.FC<IProps> = observer(({ coach }) => {
  return (
    <PageListItem className={styles.root}>
      <ListItemText
        primary={coach.email}
      />
      <div className={styles.communities}>
        {coach.communities.map(community => (
          <Chip key={community} label={community} variant="filled" color="success" sx={{ marginLeft: 1 }} />
        ))}
      </div>
      {/* <ListItemButton>
        <CommunityJoinButton community={community} />
      </ListItemButton> */}
    </PageListItem>
  );
});