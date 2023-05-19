import React, { PropsWithChildren, useContext } from "react";

import styles from "./styles.module.scss";
import { AuthContext } from "common/auth/auth-context";
import { Avatar, ButtonGroup, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { UserName } from "pages/profile/user-name";
import { AppRoute } from "common/enums/app-route.enum";

interface IProps {
  classes?: {
    root?: string;
  },
}

export const PageHeader: React.FC<PropsWithChildren<IProps>> = ({
  children,
  classes = {},
}) => {
  const auth = useContext(AuthContext);
  const user = auth.authenticatedUser!;

  const basicLinks = [
    AppRoute.COMMUNITIES, AppRoute.POSTS,
  ];

  const coachLinks = [
    AppRoute.COACH,
  ];

  const links = auth.isCoach() ? [...basicLinks, ...coachLinks] : basicLinks;

  return (
    <div className={`${styles.root} ${classes.root || ""}`}>
      <div className={styles.links}>
        <ButtonGroup variant="text" aria-label="text button group">
          {links.map(link => (
            <Button key={link}>
              <Link to={link}>{link}</Link>
            </Button>
          ))}
        </ButtonGroup>     
      </div>
      <div className={styles.user}>
        <UserName email={user.email} className={styles.name} />
        <Avatar src={user.avatar()} sx={{ height: 48, width: 48 }} />
      </div>
    </div>
  );
};