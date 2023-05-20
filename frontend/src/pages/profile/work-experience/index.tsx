import React from "react";

import styles from "./styles.module.scss";
import { Chip } from "@mui/material";
import { Paper } from "components/paper";
import { WorkExperience as WorkExperienceData } from "domain/user/work-experience";

interface IProps {
  workExperience: WorkExperienceData[];
}

export const WorkExperience: React.FC<IProps> = ({ workExperience }) => {
  return (
    <Paper className={styles.root}>
      {workExperience.map(experience => (
        <Chip key={experience.toString()} label={experience.toString()} color="default" />
      ))}
    </Paper>
  );
};