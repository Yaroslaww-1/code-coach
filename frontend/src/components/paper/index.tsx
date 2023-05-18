import React, { PropsWithChildren } from "react";

import styles from "./styles.module.scss";

interface IProps {
  onClick?: () => void;
  className?: string;
}

export const Paper: React.FC<PropsWithChildren<IProps>> = ({
  children,
  onClick,
  className = "",
}) => {
  return (
    <div className={`${styles.root} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};