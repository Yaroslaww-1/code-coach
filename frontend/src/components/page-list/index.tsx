import React, { PropsWithChildren } from "react";
import { List } from "@mui/material";

export const PageList: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <List sx={{ width: "100%", maxWidth: 1000 }} >
      {children}
    </List>
  );
};