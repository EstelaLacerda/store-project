import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Register from './pages/Register';
import ChangePassword from './pages/changePassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/cadastro' element={<Register />} />
        <Route path='/change-password' element={<ChangePassword />} />
      </Routes>
    </Router>
  )
}

export default App
