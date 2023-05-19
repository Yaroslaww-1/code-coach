import React from "react";

import styles from "./styles.module.scss";
import { Chip } from "@mui/material";
import { Coach } from "domain/user/coach/coach";
import { Student } from "domain/user/student";

interface IProps {
  user: Coach | Student;
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