import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppRoute } from "common/enums/app-route.enum";
import { Communities } from "pages/communities";


import { PostsFeedPage } from "pages/posts-feed";
import { CommunityPage } from "pages/community";
import { PostPage } from "pages/post";

function App() {
  return (
    <>
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
