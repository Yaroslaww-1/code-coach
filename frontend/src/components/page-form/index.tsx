import React, { PropsWithChildren } from "react";

import styles from "./styles.module.scss";
import { Paper } from "components/paper";

interface IProps {
  className?: string;
}

export const PageForm: React.FC<PropsWithChildren<IProps>> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`${styles.root} ${className}`}>
      <Paper className={styles.content}>
        {children}

      </Paper>
      {/* <div className={styles.content}>
      </div> */}
    </div>
  );
};