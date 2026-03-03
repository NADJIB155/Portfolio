import { LayoutDashboard, Mail, FolderGit2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const MobileNav = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-around items-center p-3 z-50 transition-colors duration-300 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
      
      <NavLink to="/" className={({isActive}) => `flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${isActive ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}>
        <LayoutDashboard size={24} />
        <span className="text-[10px] font-bold">Demos</span>
      </NavLink>

      <NavLink to="/contact" className={({isActive}) => `flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${isActive ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}>
        <Mail size={24} />
        <span className="text-[10px] font-bold">Contact</span>
      </NavLink>

      {userInfo && (
        <NavLink to="/admin" className={({isActive}) => `flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${isActive ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}>
          <FolderGit2 size={24} />
          <span className="text-[10px] font-bold">Admin</span>
        </NavLink>
      )}
      
    </div>
  );
};

export default MobileNav;