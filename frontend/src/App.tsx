import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppRoute } from "common/enums/app-route.enum";
import { Communities } from "pages/communities";

import { PostsFeedPage } from "pages/posts-feed";
import { CommunityPage } from "pages/community";
import { PostPage } from "pages/post";
import { ProfilePage } from "pages/profile";
import { AuthContext, auth } from "common/auth/auth-context";
import { CoachPage } from "pages/coach";
import { ChatPage } from "pages/chat";
import ws from "api/ws";
import { useEffect, useState } from "react";

function App() {
  const [isConnected, setIsConnected] = useState(ws.connected);

  useEffect(() => {
    ws.on("connect", () => setIsConnected(true));
    ws.on("disconnect", () => setIsConnected(false));

    return () => {
      ws.off("connect");
      ws.off("disconnect");
    };
  }, []);

  if (!isConnected) return (<p>Loading</p>);

  return (
    <AuthContext.Provider value={auth}>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.COMMUNITIES} >
            <Route path={AppRoute.COMMUNITY} element={<CommunityPage />} />
            <Route path={""} element={<Communities />} />
          </Route>

          <Route path={AppRoute.POSTS} >
            <Route path={AppRoute.POST} element={<PostPage />} />
            <Route path={""} element={<PostsFeedPage />} />
          </Route>

          <Route path={AppRoute.USERS} >
            <Route path={AppRoute.USER} element={<ProfilePage />} />
          </Route>

          <Route path={AppRoute.COACH} >
            <Route path={""} element={<CoachPage />} />
          </Route>

          <Route path={AppRoute.CHAT} >
            <Route path={""} element={<ChatPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
