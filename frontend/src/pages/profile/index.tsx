import React, { useEffect, useState } from "react";
import { Page } from "components/page";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { User } from "domain/user/user";
import usersService from "api/users.service";
import { ProfileHeader } from "./profile-header";
import { Languages } from "./languages";
import { ProgrammingLanguages } from "./programming-languages";
import styles from "./styles.module.scss";

export const ProfilePage: React.FC = () => {
  const { id } = useParams();

  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      setUser(await usersService.getById(id!));
      setIsLoading(false);
    };

    fetch();
  }, []);

  if (isLoading) return (<CircularProgress />);

  return (
    <Page>
      <ProfileHeader user={user!} />
      <div className={styles.firstRow}>
        <Languages user={user!} />
        <ProgrammingLanguages user={user!} />
      </div>
    </Page>
  );
};