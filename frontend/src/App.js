import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar/index";
import Register from "./pages/users/Register";
import Login from "./pages/users/Login"
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
