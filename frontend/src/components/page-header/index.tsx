import React, { PropsWithChildren, useContext } from "react";

import styles from "./styles.module.scss";
import { Auth, AuthContext } from "common/auth/auth-context";
import { Avatar, ButtonGroup, Button } from "@mui/material";
import { Link, generatePath } from "react-router-dom";
import { UserName } from "pages/profile/user-name";
import { AppRoute } from "common/enums/app-route.enum";

interface IProps {
  classes?: {
    root?: string;
  },
}

export const PageHeader: React.FC<PropsWithChildren<IProps>> = ({
  classes = {},
}) => {
  const auth = useContext(AuthContext);
  const user = auth.authenticatedUser();

  const links = [
    { name: "Communities", link: AppRoute.COMMUNITIES },
    { name: "Posts", link: `${AppRoute.POSTS}` },
  ];

  if (auth.isCoach()) {
    links.push({ name: "My students", link: AppRoute.STUDENTS });
  }
  
  if (!auth.isCoach()) {
    links.push({ name: "My coaches", link: AppRoute.COACHES_MY });
  }

  if (!auth.isCoach()) {
    links.push({ name: "Coaches search", link: AppRoute.COACHES });
  }

  return (
    <div className={`${styles.root} ${classes.root || ""}`}>
      <div className={styles.links}>
        <ButtonGroup variant="text" aria-label="text button group">
          {links.map(({ link, name }) => (
            <Button key={link}>
              <Link to={link}>{name}</Link>
            </Button>
          ))}
        </ButtonGroup>     
      </div>
      <div className={styles.user}>
        <UserName email={user.email} className={styles.name} />
        <Avatar src={user.avatar()} sx={{ height: 48, width: 48 }} />
        <Button onClick={() => auth.logout()}>Logout</Button>
      </div>
    </div>
  );
};