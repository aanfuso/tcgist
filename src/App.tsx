import { BrowserRouter, Route, Routes } from "react-router-dom";

import Collection from "pages/Collection";
import NewCollection from "pages/NewCollection";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/agu/mtg/:setCode" element={<Collection />} />
        <Route path="/agu/mtg/:setCode/new" element={<NewCollection />} />

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
