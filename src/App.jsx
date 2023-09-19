import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Admin from "./pages/AdminPanel";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import { Context, server } from "./main";
import { useContext, useEffect } from "react";
import axios from "axios";

function App() {

  const { setUser, setIsAuthenticated, setLoading } = useContext(Context);

  // useEffect(() => {
  //   setLoading(true);
  //   axios.get(`${server}/users/me`, {
  //     withCredentials: true,
  //   }).then((res) => {
  //     setUser(res.data.user);
  //     setIsAuthenticated(true);
  //     setLoading(false);
  //   }).catch((error) => {
  //     setUser({});
  //     setIsAuthenticated(false);
  //     setLoading(false);
  //   })
  // }, [])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App