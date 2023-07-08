import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Employee from './pages/Employee';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Employee />} />
      </Routes>
    </Router>
    
  )
}

export default App
