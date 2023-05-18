import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Page } from "components/page";
import { Community } from "domain/community";
import { CommunityListItem } from "./community-list-item";
import communitiesService from "api/communities.service";
import { PageList } from "components/page-list";

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
      <PageList>
        {communities.map(community => (
          <CommunityListItem key={community.name} community={community} />
        ))}
      </PageList>
    </Page>
  );
});