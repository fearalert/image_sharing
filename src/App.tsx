import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './Layout';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />} />
        <Route path="/upload" element={<div>This is a jpload Route</div>} />
      </Routes>
    </Router>
  )
}

export default App
