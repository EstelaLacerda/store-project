import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Register from './pages/Register';
import ChangePassword from './pages/ChangePassword';
import About from './pages/About';
import Logged from './pages/Logged';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/cadastro' element={<Register />} />
        <Route path='/mudar-senha' element={<ChangePassword />} />
        <Route path='/sobre' element={<About />} />
        <Route path='/home' element={<Logged />} />
      </Routes>
    </Router>
  )
}

export default App
