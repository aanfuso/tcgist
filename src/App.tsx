import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Buylist } from "pages/Buylist";
import { CreateList } from "pages/CreateList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Buylist />} />
        <Route path="/new" element={<CreateList />} />

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
