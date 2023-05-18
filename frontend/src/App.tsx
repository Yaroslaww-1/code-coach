import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppRoute } from "common/enums/app-route.enum";
import { Communities } from "pages/communities";
import useWebSocket, { ReadyState } from "react-use-websocket";


import { PostsFeedPage } from "pages/posts-feed";
import { CommunityPage } from "pages/community";
import { PostPage } from "pages/post";
import { ProfilePage } from "pages/profile";
import { AuthContext, auth } from "common/auth/auth-context";
import { CoachPage } from "pages/coach";
import { ChatPage } from "pages/chat";
import ws from "api/ws/ws";

function App() {
  const { sendMessage, lastMessage, readyState } = useWebSocket("ws://localhost:8001/chats/messages");
  if (readyState !== ReadyState.OPEN) return (<>Loading</>);
  ws.initialize(sendMessage);

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
