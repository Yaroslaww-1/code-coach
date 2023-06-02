/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Page } from "components/page";
import { CoachListItem } from "./coach-list-item";
import { PageList } from "components/page-list";
import { AuthContext } from "common/auth/auth-context";
import { MentorshipRequestListItem } from "./mentorship-request-list-item";

export const MyCoachesPage: React.FC = observer(() => {
  const auth = useContext(AuthContext);

  const student = auth.authenticatedStudent!;

  return (
    <Page>
      <PageList>
        {student.coaches.map(coach => (
          <CoachListItem key={coach.coach} coach={coach} />
        ))}
        {student.mentorshipRequests.map(coach => (
          <MentorshipRequestListItem coach={coach} key={coach} />
        ))}
      </PageList>
    </Page>
  );
});