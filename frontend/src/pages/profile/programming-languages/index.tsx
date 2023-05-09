import React from "react";

import styles from "./styles.module.scss";
import { Chip } from "@mui/material";
import { User } from "domain/user/user";

interface IProps {
  user: User;
}

export const ProgrammingLanguages: React.FC<IProps> = ({ user }) => {
  return (
    <div className={styles.root}>
      {user.programmingLanguages.map(language => (
        <Chip key={language} label={language} color="warning" />
      ))}
    </div>
  );
};