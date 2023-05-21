import React, { useEffect, useState, useContext } from "react";
import { Page } from "components/page";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import usersService from "api/users.service";
import { ProfileHeader } from "./profile-header";
import { Languages } from "./languages";
import { ProgrammingLanguages } from "./programming-languages";
import styles from "./styles.module.scss";
import { Coach } from "domain/user/coach/coach";
import coachesService from "api/coaches.service";
import { AuthContext } from "common/auth/auth-context";
import { StudentInfo } from "./student-info";
import { CoachInfo } from "./coach-info";
import { EditStudentForm } from "./edit-student-form";
import { EditCoachForm } from "./edit-coach-form";
import { Student } from "domain/user/student";
import studentsService from "api/students.service";

export const OtherProfilePage: React.FC = () => {
  const { id } = useParams();

  const [user, setUser] = useState<Coach | Student>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      const coach = await coachesService.getById(id!);
      const student = await studentsService.getById(id!);

      if (coach) setUser(coach);
      else setUser(student!);

      setIsLoading(false);
    };

    fetch();
  }, []);

  if (isLoading) return (<CircularProgress />);

  return (
    <Page>
      <ProfileHeader user={user!} openEditingForm={() => {}} />
      {user?.role.toLocaleLowerCase() === "coach"
        ? <CoachInfo coach={user as Coach} />
        : <StudentInfo student={user as Student} />}
    </Page>
  );
};