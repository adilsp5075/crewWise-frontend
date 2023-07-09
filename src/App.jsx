import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Employee from './pages/Employee';
import Department from './pages/Department';
import Home from './pages/Home';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/department" element={<Department />} />
      </Routes>
    </Router>
    
  )
}

export default App
