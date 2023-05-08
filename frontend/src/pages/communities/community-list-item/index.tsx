import React from "react";

import { Community } from "domain/community";

import styles from "./styles.module.scss";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Button, ListItemButton } from "@mui/material";
import { observer } from "mobx-react-lite";

interface IProps {
  community: Community;
}

export const CommunityListItem: React.FC<IProps> = observer(({ community }) => {
  const join = () => {
    community.join();
  };

  const leave = () => {
    community.leave();
  };

  return (
    <ListItem alignItems="flex-start" classes={{ "root": styles.root }} >
      <ListItemAvatar>
        <Avatar src={community.logoUrl()} />
      </ListItemAvatar>
      <ListItemText
        primary={community.name}
        secondary={community.description}
      />
      <ListItemButton>
        {community.isJoined
          ? <Button variant="outlined" onClick={leave}>Leave</Button>
          : <Button variant="outlined" onClick={join}>Join</Button>}
      </ListItemButton>
    </ListItem>
  );
});