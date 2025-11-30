import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Register from './pages/Register';
import ChangePassword from './pages/changePassword';
import About from './pages/About';
import Logged from './pages/Logged';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/cadastro' element={<Register />} />
        <Route path='/change-password' element={<ChangePassword />} />
        <Route path='/about' element={<About />} />
        <Route path='/logged' element={<Logged />} />
      </Routes>
    </Router>
  )
}

export default App
