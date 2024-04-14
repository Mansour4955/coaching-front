import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import NotFound from "./pages/NotFound";
import ResetPass from "./auth/ResetPass";
function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="mb-[60px]"><Header /></div>
        <div className="flex gap-4">
          <div className="flex-1">
            <Routes>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="resetpass" element={<ResetPass />} />
              <Route path="register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
