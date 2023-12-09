import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Logo from './Components/Logo';

function App() {
  return (
    <>
    <Logo />
    <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
    </Router>
    </>
  );
}

export default App;
