import React, { PropsWithChildren } from "react";
import { ListItem, Paper } from "@mui/material";

import styles from "./styles.module.scss";

interface IProps {
  onClick?: () => void;
  className?: string;
}

export const PageListItem: React.FC<PropsWithChildren<IProps>> = ({
  children,
  onClick,
  className = "",
}) => {
  return (
    <Paper>
      <ListItem alignItems="flex-start" classes={{ "root": `${styles.root} ${className}` }} onClick={onClick}>
        {children}
      </ListItem>
    </Paper>
  );
};