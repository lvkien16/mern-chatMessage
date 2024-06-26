import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Search from "./pages/Search";

export default function App() {
  const path = window.location.pathname;
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/messages/:userId" element={<Messages />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/search/:search" element={<Search />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
