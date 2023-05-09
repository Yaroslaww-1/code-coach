import React from "react";

import styles from "./styles.module.scss";
import { Avatar, Chip } from "@mui/material";
import { User } from "domain/user/user";

interface IProps {
  user: User;
}

export const ProfileHeader: React.FC<IProps> = ({ user }) => {
  return (
    <div className={styles.root}>
      <Avatar src={user.avatar()} sx={{ width: 76, height: 76 }}/>
      <span className={styles.name}>{user.name}</span>
      <Chip label={user.role} color="success" />
      {/* <div>
          <CommunityJoinButton community={community} />
        </div> */}
    </div>
  );
};