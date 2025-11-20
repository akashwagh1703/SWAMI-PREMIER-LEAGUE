import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import Register from './pages/Register';
import Admin from './pages/Admin';
import RegistrationDetails from './pages/RegistrationDetails';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-black">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/registration-details/:id" element={<RegistrationDetails />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
