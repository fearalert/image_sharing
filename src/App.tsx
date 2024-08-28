import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>This is a JSX route</div>} />
        <Route path="/upload" element={<div>This is a jpload Route</div>} />
      </Routes>
    </Router>
  )
}

export default App
