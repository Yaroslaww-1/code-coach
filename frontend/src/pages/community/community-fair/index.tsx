import React, { useContext, useEffect, useState } from "react";

import styles from "./styles.module.scss";
import { Paper } from "components/paper";
import { Fair } from "domain/fair/Fair";
import { CircularProgress, Button } from "@mui/material";
import fairsService from "api/fairs.service";
import { AuthContext } from "common/auth/auth-context";
import { observer } from "mobx-react-lite";

interface IProps {
  community: string;
}

export const CommunityFair: React.FC<IProps> = observer(({ community }) => {
  const [fair, setFair] = useState<Fair | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetch = async () => {
      const fair = await fairsService.getByCommunity(community);
      setFair(fair);
      setIsLoading(false);
    };

    fetch();
  }, []);

  const join = async () => {
    await fair?.join(auth.authenticatedCoach!);
  };

  if (isLoading) return (<CircularProgress />);

  return (
    <Paper className={styles.root}>
      <p>There are {fair?.membersCount} coaches currently looking for students.</p>
      <div>
        {auth.isCoach() && !fair?.isJoined && <Button variant="outlined" onClick={join}>Join</Button>}
      </div>
    </Paper>
  );
});