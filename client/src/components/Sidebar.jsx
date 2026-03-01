import { LayoutDashboard, LogIn, LogOut, FolderGit2, Moon, Sun } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Check if user is logged in
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('userInfo'); // Delete the key
      navigate('/login'); // Send to Login page
      window.location.reload(); // Refresh to update the Sidebar UI
    }
  };

  return (
    <div className="w-64 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 fixed left-0 top-0 hidden md:flex flex-col p-6 transition-colors duration-300">
      
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Nadjib.Dev</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2">
        <Link to="/" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-xl font-medium transition-colors">
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        
        {/* ONLY SHOW ADMIN PANEL IF LOGGED IN */}
        {userInfo && (
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white rounded-xl font-medium transition-colors">
            <FolderGit2 size={20} />
            Admin Panel
          </Link>
        )}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto">
        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 mb-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white rounded-xl font-medium transition-colors text-left"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>

        {/* LOGIN / LOGOUT TOGGLE */}
        {userInfo ? (
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-medium transition-colors text-left"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        ) : (
          <Link to="/login" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 transition-colors">
            <LogIn size={20} />
            <span>Login</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;