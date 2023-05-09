import React from "react";

import styles from "./styles.module.scss";
import { Chip } from "@mui/material";
import { User } from "domain/user/user";

interface IProps {
  user: User;
}

export const Languages: React.FC<IProps> = ({ user }) => {
  return (
    <div className={styles.root}>
      {user.languages.map(language => (
        <Chip key={language} label={language} color="info" />
      ))}
    </div>
  );
};