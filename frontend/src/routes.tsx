import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AuthPage from "./pages/Auth";
import ViewFilePage from "./pages/ViewFile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/view/:filename" element={<ViewFilePage />} />
    </Routes>
  );
}
