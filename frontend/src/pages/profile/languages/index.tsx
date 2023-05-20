import React from "react";

import styles from "./styles.module.scss";
import { Chip } from "@mui/material";
import { Paper } from "components/paper";

interface IProps {
  languages: string[];
}

export const Languages: React.FC<IProps> = ({ languages }) => {
  return (
    <Paper className={styles.root}>
      {languages.map(language => (
        <Chip key={language} label={language} color="info" />
      ))}
    </Paper>
  );
};