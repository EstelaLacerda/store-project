import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/cadastro' element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
