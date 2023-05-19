import { AuthContext } from "common/auth/auth-context";
import { AppRoute } from "common/enums/app-route.enum";
import React, { PropsWithChildren, useContext } from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const auth = useContext(AuthContext);

  if (!auth.isAuthenticated()) {
    return <Navigate to={AppRoute.LOGIN} replace />;
  }

  return (<>{children}</>);
};
