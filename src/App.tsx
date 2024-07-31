import { BrowserRouter, Route, Routes } from "react-router-dom";

import Collection from "pages/Collection";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/agu/mtg/dmu" element={<Collection />} />

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
