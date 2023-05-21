/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Page } from "components/page";
import { Community } from "domain/community";
import { CoachListItem } from "./coach-list-item";
import communitiesService from "api/communities.service";
import { PageList } from "components/page-list";
import fairsService from "api/fairs.service";
import { FairCoach } from "domain/fair/FairCoach";
import { Button } from "@mui/material";

export const CoachesPage: React.FC = observer(() => {
  const [coaches, setCoaches] = useState<FairCoach[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const coaches = await fairsService.getMembers();
      setCoaches(coaches);
    };

    fetch();
  }, []);

  const findRecommended = async () => {
    const coaches = await fairsService.getMembersRanked();
    setCoaches(coaches);
  };

  return (
    <Page>
      <div>
        <Button variant="outlined" onClick={findRecommended}>Find recommended</Button>
      </div>
      <PageList>
        {coaches.map(coach => (
          <CoachListItem key={coach.email} coach={coach} />
        ))}
      </PageList>
    </Page>
  );
});