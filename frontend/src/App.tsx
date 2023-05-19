import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppRoute } from "common/enums/app-route.enum";
import { Communities } from "pages/communities";

import { PostsFeedPage } from "pages/posts-feed";
import { CommunityPage } from "pages/community";
import { PostPage } from "pages/post";
import { ProfilePage } from "pages/profile";
import { AuthContext, auth } from "common/auth/auth-context";
import { StudentsPage } from "pages/students";
import { ChatPage } from "pages/chat";
import ws from "api/ws";
import { useEffect, useState } from "react";
import { LoginPage } from "pages/auth";
import { PrivateRoute } from "components/private-route";
import { CircularProgress } from "@mui/material";

function App() {
  const [isConnected, setIsConnected] = useState(ws.connected);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ws.on("connect", () => setIsConnected(true));
    ws.on("disconnect", () => setIsConnected(false));
    auth.initialize().then(() => setIsLoading(false));

    return () => {
      ws.off("connect");
      ws.off("disconnect");
    };
  }, []);

  if (!isConnected || isLoading) return (<CircularProgress />);

  return (
    <AuthContext.Provider value={auth}>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.COMMUNITIES} >
            <Route path={AppRoute.COMMUNITY} element={<PrivateRoute><CommunityPage /></PrivateRoute>}/>
            <Route path={""} element={<PrivateRoute><Communities /></PrivateRoute>}/>
          </Route>

          <Route path={AppRoute.POSTS} >
            <Route path={AppRoute.POST} element={<PrivateRoute><PostPage /></PrivateRoute>}/>
            <Route path={""} element={<PrivateRoute><PostsFeedPage /></PrivateRoute>}/>
          </Route>

          <Route path={AppRoute.USERS} >
            <Route path={AppRoute.USER} element={<PrivateRoute><ProfilePage /></PrivateRoute>}/>
          </Route>

          <Route path={AppRoute.LOGIN} element={<LoginPage />}/>

          <Route path={AppRoute.STUDENTS} >
            <Route path={""} element={<PrivateRoute><StudentsPage /></PrivateRoute>} />
          </Route>

          <Route path={AppRoute.CHAT} >
            <Route path={""} element={<PrivateRoute><ChatPage /></PrivateRoute>} />
          </Route>

          <Route path={AppRoute.BASE} element={<PrivateRoute><PostsFeedPage /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
