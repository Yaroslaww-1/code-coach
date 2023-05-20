import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import postsService from "api/posts.service";
import { Student } from "domain/user/student";
import { Chip, Divider } from "@mui/material";

import styles from "./styles.module.scss";
import studentsService from "api/students.service";

interface IProps {
  student: Student;
  open: boolean;
  close: (student: Student) => void;
}

export const EditStudentForm: React.FC<IProps> = ({ open, close, student }) => {
  const [languages, setLanguages] = useState(student.languages);
  const [newLanguage, setNewLanguage] = useState("");

  const [programmingLanguages, setProgrammingLanguages] = useState(student.programmingLanguages);
  const [newProgrammingLanguage, setNewProgrammingLanguage] = useState("");

  const save = async () => {
    student.languages = languages;
    student.programmingLanguages = programmingLanguages;
    await studentsService.edit(student);
    window.location.reload();
  };

  const deleteLanguage = (language: string) => {
    setLanguages(languages => languages.filter(l => l !== language));
  };

  const addLanguage = () => {
    setLanguages(languages => [...languages, newLanguage]);
    setNewLanguage("");
  };

  const deleteProgrammingLanguage = (language: string) => {
    setProgrammingLanguages(languages => languages.filter(l => l !== language));
  };

  const addProgrammingLanguage = () => {
    setProgrammingLanguages(languages => [...languages, newProgrammingLanguage]);
    setNewProgrammingLanguage("");
  };

  return (
    <Dialog open={open} fullWidth={true} >
      <DialogTitle>Edit user</DialogTitle>
      <DialogContent>
        <Divider style={{ marginTop: "12px", marginBottom: "12px" }}>Languages</Divider>
        {languages.map(language => (
          <Chip key={language} label={language} variant="outlined" onDelete={() => deleteLanguage(language)} />
        ))}
        <div className={styles.edit}>
          <TextField
            autoFocus
            margin="dense"
            id="language"
            label="Add language"
            type="text"
            fullWidth
            variant="standard"
            value={newLanguage}
            multiline
            onChange={e => setNewLanguage(e.target.value)}
          />
          <Button variant="outlined" onClick={addLanguage}>Save</Button>
        </div>

        <Divider style={{ marginTop: "12px", marginBottom: "12px" }}>Programming languages</Divider>
        {programmingLanguages.map(language => (
          <Chip key={language} label={language} variant="outlined" onDelete={() => deleteProgrammingLanguage(language)} />
        ))}
        <div className={styles.edit}>
          <TextField
            autoFocus
            margin="dense"
            id="programming-language"
            label="Add programming language"
            type="text"
            fullWidth
            variant="standard"
            value={newProgrammingLanguage}
            multiline
            onChange={e => setNewProgrammingLanguage(e.target.value)}
          />
          <Button variant="outlined" onClick={addProgrammingLanguage}>Save</Button>
        </div>
      </DialogContent>
      <DialogActions className={styles.actions}>
        <Button variant="outlined" color="success" onClick={save}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};