import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Logo from './Components/Logo';
import Reminder from './screen/Reminder.jsx'
import Task from './screen/Task.jsx'
import Home from './Pages/Home';

function App() {
  return (
    <Router>
     {/*  <Logo /> */}
        <Routes>
        <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/Reminder' element={<Reminder/>} />
          <Route path='/Task' element={<Task/>} />
        </Routes>
    </Router>
  );
}

export default App;
