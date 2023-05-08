import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppRoute } from "common/enums/app-route.enum";
import { Communities } from "pages/communities";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { PostsFeedPage } from "pages/posts-feed";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.COMMUNITIES} element={<Communities />} />
          <Route path={AppRoute.POSTS} element={<PostsFeedPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
