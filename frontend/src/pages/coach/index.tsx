import React, { useEffect, useState, useContext } from "react";
import { Page } from "components/page";
import { CircularProgress } from "@mui/material";
import { StudentListItem } from "./student-list-item";
import { Coach } from "domain/user/coach/coach";
import coachesService from "api/coaches.service";
import { observer } from "mobx-react-lite";
import { AuthContext } from "common/auth/auth-context";
import { MentorshipRequestListItem } from "./mentorship-request-list-item";
import { PageList } from "components/page-list";

export const CoachPage: React.FC = observer(() => {
  const auth = useContext(AuthContext);

  const [coach, setCoach] = useState<Coach>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      setCoach(await coachesService.getById(auth.authenticatedUser));
      setIsLoading(false);
    };

    fetch();
  }, []);

  if (isLoading) return (<CircularProgress />);

  return (
    <Page>
      <PageList>
        {coach?.students.map(student => (
          <StudentListItem key={student.email} student={student} />
        ))}
        {coach?.mentorshipRequests.map(applicant => (
          <MentorshipRequestListItem coach={coach} key={applicant} applicant={applicant} />
        ))}
      </PageList>
    </Page>
  );
});