import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar/index";
import Register from "./pages/users/Register";
import Login from "./pages/users/Login"
import Settings from "./pages/users/Settings";
import { UserProvider } from "./context/UserContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from "./components/Container";
import AddNews from "./pages/news/create"
import Profile from "./pages/users/Profile";

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <NavBar />
          <Container>
          <ToastContainer />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/users/settings" element={<Settings />} />
            <Route exact path="/news/create" element={<AddNews />} />
            <Route exact path="/users/profile" element={<Profile />} />
          </Routes>
          </Container>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
