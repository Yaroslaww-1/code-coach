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

export const ProfilePage: React.FC = () => {
  const { id } = useParams();

  // const [coach, setCoach] = useState<Coach>();
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const fetch = async () => {
  //     const user = await usersService.getById(id!);
  //     if (user.role === "Coach") {
  //       setCoach(await coachesService.getById(id!));
  //     }
  //     setIsLoading(false);
  //   };

  //   fetch();
  // }, []);

  // if (isLoading) return (<CircularProgress />);

  const auth = useContext(AuthContext);

  const user = (auth.authenticatedCoach || auth.authenticatedStudent)!;

  return (
    <Page>
      <ProfileHeader user={user} />
      {auth.isCoach()
        ? <CoachInfo coach={auth.authenticatedCoach!} />
        : <StudentInfo student={auth.authenticatedStudent!} />}
    </Page>
  );
};