import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar/index";
import Register from "./pages/users/Register";
import Login from "./pages/users/Login"
import Settings from "./pages/users/Settings";
import { UserProvider } from "./context/UserContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <NavBar />
          <ToastContainer />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/users/settings" element={<Settings />} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
