import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import Messages from "./pages/Messages";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";

export default function App() {
  const path = window.location.pathname;
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
