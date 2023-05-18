import React, { PropsWithChildren } from "react";

import styles from "./styles.module.scss";

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
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};