import React from "react";

import { Community } from "domain/community";

import styles from "./styles.module.scss";

interface IProps {
  community: Community;
}

export const CommunityListItem: React.FC<IProps> = ({ community }) => {
  return (
    <div className={styles.root}>
      <h1>{community.name()}</h1>
      <h1>{community.description()}</h1>
    </div>
  );
};