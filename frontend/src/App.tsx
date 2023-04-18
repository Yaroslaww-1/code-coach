import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppRoute } from "common/enums/app-route.enum";
import { Communities } from "pages/communities";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.COMMUNITIES} element={<Communities />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
