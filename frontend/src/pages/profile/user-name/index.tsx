import React from "react";

import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { AppRoute } from "common/enums/app-route.enum";

interface IProps {
  email: string;
  className?: string;
}

export const UserName: React.FC<IProps> = ({ email, className = "" }) => {
  const name = email.split("@", 1)[0];

  return (
    <Link to={`${AppRoute.USERS}/${name}`} className={`${styles.root} ${className}`}>{name}</Link>
  );
};