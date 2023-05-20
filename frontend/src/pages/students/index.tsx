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

export const StudentsPage: React.FC = observer(() => {
  const auth = useContext(AuthContext);

  // const [coach, setCoach] = useState<Coach>();
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const fetch = async () => {
  //     setCoach((await coachesService.getById(auth.authenticatedCoach!.email))!);
  //     setIsLoading(false);
  //   };

  //   fetch();
  // }, []);

  // if (isLoading) return (<CircularProgress />);

  return (
    <Page>
      <PageList>
        {auth.authenticatedCoach?.students.map(student => (
          <StudentListItem key={student.email} student={student} />
        ))}
        {auth.authenticatedCoach?.mentorshipRequests.map(applicant => (
          <MentorshipRequestListItem coach={auth.authenticatedCoach!} key={applicant} applicant={applicant} />
        ))}
      </PageList>
    </Page>
  );
});