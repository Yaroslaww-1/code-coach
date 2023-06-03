import React from "react";
import { Community } from "domain/community";

import styles from "./styles.module.scss";
import { Avatar, Button } from "@mui/material";
import { CommunityJoinButton } from "../community-join-button";
import { Paper } from "components/paper";

interface IProps {
  community: Community;
  openPostForm: () => void;
}

export const CommunityHeader: React.FC<IProps> = ({ community, openPostForm }) => {
  return (
    <>
      <Paper className={styles.general}>
        <div className={styles.logoAndName}>
          <Avatar src={community.logo} sx={{ width: 76, height: 76 }}/>
          <span className={styles.name}>{community.name}</span>
          <span className={styles.members}>{community.membersCount} members</span>
        </div>
        <div>
          <Button variant="outlined" onClick={openPostForm}>Post</Button>
          <CommunityJoinButton community={community} />
        </div>
      </Paper>
      <Paper className={styles.details}>
        <p>{community.description}</p>
      </Paper>
    </>
  );
};