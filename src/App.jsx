import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import CatalogPage from "./components/CatalogPage/CatalogPage";
import "./App.css";
import Heder from "./components/Heder/Heder";
import CamperDetailsPage from "./components/CamperDetailsPage/CamperDetailsPage";

function App() {
  return (
    <>
      <Heder />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CamperDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
