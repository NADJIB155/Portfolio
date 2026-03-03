import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav'; 
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
        
        {/* Affiché uniquement sur PC (md:flex) */}
        <Sidebar />
        
        {/* On ajoute pb-24 sur mobile pour que la barre du bas ne cache pas le contenu */}
        <div className="flex-1 md:ml-64 p-4 md:p-8 pb-24 md:pb-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      
        {/* Affiché uniquement sur Mobile (md:hidden) */}
        <MobileNav />

      </div>
    </BrowserRouter>
  );
}

export default App;