import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "components/Navbar";
import Home from "pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="relative flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
