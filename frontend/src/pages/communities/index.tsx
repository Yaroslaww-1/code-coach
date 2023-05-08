import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import { observer } from "mobx-react-lite";
import { Page } from "components/page";
import { Community } from "domain/community";
import { CommunityListItem } from "./community-list-item";
import communitiesService from "api/communities.service";

export const Communities: React.FC = observer(() => {
  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const communities = await communitiesService.getAll();
      setCommunities(communities);
    };

    fetch();
  }, []);

  return (
    <Page>
      <List sx={{ width: "100%", maxWidth: 800, bgcolor: "background.paper" }}>
        {communities.map(community => (
          <CommunityListItem key={community.name} community={community} />
        ))}
      </List>
    </Page>
  );
});