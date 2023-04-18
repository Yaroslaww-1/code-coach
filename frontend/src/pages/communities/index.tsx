import React from "react";

import { Page } from "components/page";
import { Community } from "domain/community";
import { CommunityListItem } from "./community-list-item";

export const Communities: React.FC = () => {
  const communities = [
    new Community("id1", "r/React", "React developers community"),
    new Community("id2", "r/Vue", "Vue developers community"),
  ];

  return (
    <Page>
      {communities.map(community => (
        <CommunityListItem key={community.id()} community={community} />
      ))}
    </Page>
  );
};