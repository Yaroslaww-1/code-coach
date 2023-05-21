import React, { useContext } from "react";

import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { AppRoute } from "common/enums/app-route.enum";
import { AuthContext } from "common/auth/auth-context";

interface IProps {
  email: string;
  className?: string;
}

export const UserName: React.FC<IProps> = ({ email, className = "" }) => {
  const auth = useContext(AuthContext);

  const name = email.split("@", 1)[0];

  const link = auth.authenticatedUser()?.email === email ? AppRoute.USER_MY : `${AppRoute.USERS}/${email}`;

  return (
    <Link to={link} className={`${styles.root} ${className}`} onClick={e => e.stopPropagation()}>{name}</Link>
  );
};