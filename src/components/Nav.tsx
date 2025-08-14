import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavProps {
  title?: string;
  subtitle?: string;
  showLocation?: boolean;
  showNavigation?: boolean;
}

const Nav: React.FC<NavProps> = ({ 
  title = "BSTC Dashboard", 
  subtitle = "Breakdown Maintenance Service",
  showLocation = true,
  showNavigation = true
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Add any logout logic here (clear tokens, etc.)
    navigate('/login');
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="BSTC Logo" className="h-10 w-auto" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
        </div>

        {/* Navigation Menu */}
        {showNavigation && (
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => navigate('/dashboard')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                isActivePath('/dashboard')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/reports')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                isActivePath('/reports')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Reports
            </button>
            <button
              onClick={() => navigate('/teams')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                isActivePath('/teams')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Teams
            </button>
          </nav>
        )}

        <div className="flex items-center space-x-4">
          {showLocation && (
            <div className="text-right">
              <p className="text-sm text-gray-600">Muscat, Oman</p>
              <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
            </div>
          )}
          
          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">AD</span>
                </div>
                <span className="text-sm text-gray-700 hidden sm:block">Admin</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
              title="Logout"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {showNavigation && (
        <nav className="md:hidden mt-4 pt-4 border-t border-gray-200">
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                isActivePath('/dashboard')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/reports')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                isActivePath('/reports')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Reports
            </button>
            <button
              onClick={() => navigate('/teams')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                isActivePath('/teams')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Teams
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Nav;
