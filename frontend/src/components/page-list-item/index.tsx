import React, { PropsWithChildren } from "react";
import { ListItem, Paper } from "@mui/material";

import styles from "./styles.module.scss";

interface IProps {
  onClick?: () => void;
}

export const PageListItem: React.FC<PropsWithChildren<IProps>> = ({
  children,
  onClick,
}) => {
  return (
    <Paper>
      <ListItem alignItems="flex-start" classes={{ "root": styles.root }} onClick={onClick}>
        {children}
      </ListItem>
    </Paper>
  );
};