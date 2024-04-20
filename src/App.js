import { BrowserRouter, Route, Routes } from "react-router-dom";
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
function App() {
  return (
    <div className="">
      <Provider store={store}>
        <BrowserRouter>
          <div className="mb-[60px]">
            <Header />
          </div>
          <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="coachCards" element={<CoachCards />} />
            <Route
              path="coachCards/:coachProfileId"
              element={<CoachProfile />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
