import React from "react";
import { Community } from "domain/community";

import styles from "./styles.module.scss";
import { Avatar, Button } from "@mui/material";
import { observer } from "mobx-react-lite";

interface IProps {
  community: Community;
}

export const CommunityJoinButton: React.FC<IProps> = observer(({ community }) => {
  const join = () => {
    community.join();
  };

  const leave = () => {
    community.leave();
  };

  return (
    <>
      {community.isJoined
        ? <Button variant="outlined" color="error" onClick={leave}>Leave</Button>
        : <Button variant="outlined" onClick={join}>Join</Button>}
    </>
  );
});