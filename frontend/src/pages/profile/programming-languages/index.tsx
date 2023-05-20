import React from "react";

import styles from "./styles.module.scss";
import { Chip } from "@mui/material";
import { Paper } from "components/paper";

interface IProps {
  programmingLanguages: string[];
}

export const ProgrammingLanguages: React.FC<IProps> = ({ programmingLanguages }) => {
  return (
    <Paper className={styles.root}>
      {programmingLanguages.map(language => (
        <Chip key={language} label={language} color="warning" />
      ))}
    </Paper>
  );
};