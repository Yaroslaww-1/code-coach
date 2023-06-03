import React from "react";

import { Community } from "domain/community";

import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { ListItemButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useNavigate, generatePath } from "react-router-dom";
import { AppRoute } from "common/enums/app-route.enum";
import { CommunityJoinButton } from "pages/community/community-join-button";
import { PageListItem } from "components/page-list-item";

interface IProps {
  community: Community;
}

export const CommunityListItem: React.FC<IProps> = observer(({ community }) => {
  const navigate = useNavigate();

  const goToCommunity = () => {
    navigate(generatePath(AppRoute.COMMUNITY, { id: community.name }));
  };

  return (
    <PageListItem onClick={goToCommunity}>
      <ListItemAvatar>
        <Avatar src={community.logo} />
      </ListItemAvatar>
      <ListItemText
        primary={community.name}
        secondary={community.description}
      />
      <ListItemButton>
        <CommunityJoinButton community={community} />
      </ListItemButton>
    </PageListItem>
  );
});