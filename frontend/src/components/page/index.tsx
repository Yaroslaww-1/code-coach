import React, { PropsWithChildren } from "react";

import styles from "./styles.module.scss";
import { PageHeader } from "../page-header";

interface IProps {
  withHeader?: boolean;
  classes?: {
    root?: string;
  },
}

export const Page: React.FC<PropsWithChildren<IProps>> = ({
  children,
  classes = {},
  withHeader = true,
}) => {
  return (
    <div className={`${styles.page} ${classes.root || ""}`}>
      {withHeader && <PageHeader />}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};