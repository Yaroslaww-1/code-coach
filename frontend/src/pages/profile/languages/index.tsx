import React from "react";

import styles from "./styles.module.scss";
import { Chip } from "@mui/material";
import { Coach } from "domain/user/coach/coach";

interface IProps {
  user: Coach;
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