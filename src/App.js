import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Logo from "./Components/Logo";
import Reminder from "./screen/Reminder.jsx";
import Task from "./screen/Task.jsx";
import Home from "./Pages/Home";
import { Web5Provider } from "./web5Context.jsx";

function App() {
  return (
    <Web5Provider>
      <Router>
        {/*  <Logo /> */}
        <Routes>
          <Route path="/auxibot" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<SignUp />} />
          <Route path="/Reminder" element={<Reminder />} />
          <Route path="/Task" element={<Task />} />
        </Routes>
      </Router>
    </Web5Provider>
  );
}

export default App;
