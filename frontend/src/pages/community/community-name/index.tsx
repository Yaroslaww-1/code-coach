import React from "react";

import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { AppRoute } from "common/enums/app-route.enum";

interface IProps {
  name: string;
  className?: string;
}

export const CommunityName: React.FC<IProps> = ({ name, className = "" }) => {
  return (
    <Link to={`${AppRoute.COMMUNITIES}/${name}`} className={`${styles.root} ${className}`}>{name}</Link>
  );
};