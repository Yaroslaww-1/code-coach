import React from "react";

import styles from "./styles.module.scss";
import { Languages } from "../languages";
import { ProgrammingLanguages } from "../programming-languages";
import { Coach } from "domain/user/coach/coach";
import { WorkExperience } from "../work-experience";

interface IProps {
  coach: Coach;
}

export const CoachInfo: React.FC<IProps> = ({ coach }) => {
  return (
    <div className={styles.root}>
      <Languages languages={coach.languages} />
      <ProgrammingLanguages programmingLanguages={coach.programmingLanguages} />
      <WorkExperience workExperience={coach.workExperience} />
    </div>
  );
};