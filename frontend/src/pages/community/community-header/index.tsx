import React from "react";
import { Community } from "domain/community";

import styles from "./styles.module.scss";
import { Avatar } from "@mui/material";
import { CommunityJoinButton } from "../community-join-button";
import { Paper } from "components/paper";

interface IProps {
  community: Community;
}

export const CommunityHeader: React.FC<IProps> = ({ community }) => {
  return (
    <>
      <Paper className={styles.general}>
        <div className={styles.logoAndName}>
          <Avatar src={community.logoUrl()} sx={{ width: 76, height: 76 }}/>
          <span className={styles.name}>{community.name}</span>
          <span className={styles.members}>{community.membersCount} members</span>
        </div>
        <div>
          <CommunityJoinButton community={community} />
        </div>
      </Paper>
      <Paper className={styles.details}>
        <p>{community.description}</p>
      </Paper>
    </>
  );
};