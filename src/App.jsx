import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import CatalogPage from "./components/CatalogPage/CatalogPage";
import "./App.css";
import Heder from "./components/Heder/Heder";
import CamperDetailsPage from "./components/CamperDetailsPage/CamperDetailsPage";
import Features from "./components/Features/Features";
import Reviews from "./components/Reviews/Reviews";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Heder />
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CamperDetailsPage />}>
          <Route path="features" element={<Features />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
