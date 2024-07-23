import "./App.css";
// import 'bootstrap/dist/css/bootstrap.css'
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Logout from "./components/Logout";
import { createContext, useReducer } from "react";
import { initialState, reducer } from "./reducer/UseReducer";

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <NavBar />

          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
