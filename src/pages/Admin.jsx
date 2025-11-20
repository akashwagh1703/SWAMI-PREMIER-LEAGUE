import { Link } from 'react-router-dom';
import AdminDashboard from '../components/Admin/AdminDashboard';

function Admin() {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <Link to="/" className="text-primary-500 hover:text-primary-400 font-medium">
            ← Back to Home
          </Link>
        </div>
        
        <div className="section-card">
          <AdminDashboard />
        </div>
      </div>
    </div>
  );
}

export default Admin;
