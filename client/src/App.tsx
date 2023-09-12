import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PuzzlePage from "./pages/PuzzlePage";
import LandingPage_v2 from "./pages/LandingPage_v2";

function App() {

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage_v2 />} />
          <Route path="/puzzles/:id" element={<PuzzlePage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
