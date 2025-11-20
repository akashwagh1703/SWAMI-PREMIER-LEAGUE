import { Link } from 'react-router-dom';
import logo from '../../assets/images/swami-logo.png';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Swami Logo" className="w-12 h-12" />
            <span className="text-xl font-bold text-primary-600">SCPL 2026</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/register" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Register
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
