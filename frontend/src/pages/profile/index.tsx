import React, { useEffect, useState } from "react";
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

export const ProfilePage: React.FC = () => {
  const { id } = useParams();

  const [coach, setCoach] = useState<Coach>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      const user = await usersService.getById(id!);
      if (user.role === "Coach") {
        setCoach(await coachesService.getById(id!));
      }
      setIsLoading(false);
    };

    fetch();
  }, []);

  if (isLoading) return (<CircularProgress />);

  return (
    <Page>
      <ProfileHeader user={coach!} />
      <div className={styles.firstRow}>
        <Languages user={coach!} />
        <ProgrammingLanguages user={coach!} />
      </div>
    </Page>
  );
};