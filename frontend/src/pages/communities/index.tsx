import React, { useEffect } from "react";

import { Page } from "components/page";
import { Community } from "domain/community";
import { CommunityListItem } from "./community-list-item";
import communitiesService from "api/communities.service";

export const Communities: React.FC = () => {
  const communities = [
    new Community("id1", "r/React", "React developers community"),
    new Community("id2", "r/Vue", "Vue developers community"),
  ];

  useEffect(() => {
    communitiesService.getAll().then(console.log);
  });

  return (
    <Page>
      {communities.map(community => (
        <CommunityListItem key={community.id} community={community} />
      ))}
    </Page>
  );
};