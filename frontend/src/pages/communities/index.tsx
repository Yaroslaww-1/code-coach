import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Page } from "components/page";
import { Community } from "domain/community";
import { CommunityListItem } from "./community-list-item";
import communitiesService from "api/communities.service";
import { PageList } from "components/page-list";
import { CreateCommunityForm } from "./create-community-form";
import { Paper } from "components/paper";
import { Button } from "@mui/material";

import styles from "./styles.module.scss";

export const Communities: React.FC = observer(() => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const communities = await communitiesService.getAll();
      setCommunities(communities);
    };

    fetch();
  }, []);

  return (
    <Page classes={{ root: styles.root }}>
      <Paper className={styles.actions}>
        <Button onClick={() => setOpen(true)} variant="outlined" color="info">Create community</Button>
      </Paper>
      <CreateCommunityForm open={open} close={() => setOpen(false)}  />
      <PageList>
        {communities.map(community => (
          <CommunityListItem key={community.name} community={community} />
        ))}
      </PageList>
    </Page>
  );
});