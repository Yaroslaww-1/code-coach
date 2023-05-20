import React from "react";

import styles from "./styles.module.scss";
import { Paper } from "@mui/material";
import { Student } from "domain/user/student";
import { Languages } from "../languages";
import { ProgrammingLanguages } from "../programming-languages";

interface IProps {
  student: Student;
}

export const StudentInfo: React.FC<IProps> = ({ student }) => {
  return (
    <div className={styles.root}>
      <Languages languages={student.languages} />
      <ProgrammingLanguages programmingLanguages={student.programmingLanguages} />
    </div>
  );
};