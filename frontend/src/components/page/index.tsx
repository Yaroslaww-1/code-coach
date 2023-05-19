import React, { PropsWithChildren } from "react";

import styles from "./styles.module.scss";
import { PageHeader } from "../page-header";

interface IProps {
  classes?: {
    root?: string;
  },
}

export const Page: React.FC<PropsWithChildren<IProps>> = ({
  children,
  classes = {},
}) => {
  return (
    <div className={`${styles.page} ${classes.root || ""}`}>
      <PageHeader />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};