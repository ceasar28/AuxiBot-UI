import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Reminder from './screen/Reminder.jsx'
import Task from './screen/Task.jsx'

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/Reminder' element={<Reminder/>} />
          <Route path='/Task' element={<Task/>} />
        </Routes>
    </Router>
  );
}

export default App;
