import { BrowserRouter, Route, Routes,useLocation  } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import NotFound from "./pages/NotFound";
import CoachCards from "./pages/CoachCards";
import CoachProfile from "./pages/CoachProfile";
import ChatPage from "./pages/ChatPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import MyProfile from "./pages/MyProfile";
import AppointmentPage from "./pages/AppointmentPage";
import { useEffect } from "react";
function App() {

  function ScrollToTopOnPageChange() {
    const location = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
  
    return null;
  }
  
  return (
    <div className="bg-white_color">
      <Provider store={store}>
        <BrowserRouter>
            <ScrollToTopOnPageChange />
          <div className="mb-[60px]">
            <Header />
          </div>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/coachCards" element={<CoachCards />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/rendez-vous" element={<AppointmentPage />} />
            <Route
              path="/coachCards/:coachProfileId"
              element={<CoachProfile />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
