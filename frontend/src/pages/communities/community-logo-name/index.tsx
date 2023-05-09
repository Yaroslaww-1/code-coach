import React from "react";
import Avatar from "@mui/material/Avatar";

import styles from "./styles.module.scss";
import { CommunityName } from "pages/community/community-name";

interface IProps {
  avatarUrl: string;
  name: string;
}

export const CommunityLogoName: React.FC<IProps> = ({ avatarUrl, name }) => {
  return (
    <div className={styles.root}>
      <Avatar sx={{ width: 24, height: 24 }} src={avatarUrl} />
      <CommunityName name={name} className={styles.name} />
    </div>
  );
};