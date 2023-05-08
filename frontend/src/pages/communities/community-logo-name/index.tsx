import React from "react";
import Avatar from "@mui/material/Avatar";

import styles from "./styles.module.scss";

interface IProps {
  avatarUrl: string;
  name: string;
}

export const CommunityLogoName: React.FC<IProps> = ({ avatarUrl, name }) => {
  return (
    <div className={styles.root}>
      <Avatar sx={{ width: 24, height: 24 }} src={avatarUrl} />
      <span>{name}</span>
    </div>
  );
};