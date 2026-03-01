import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      {/* UPDATED LINE BELOW: 
        Added 'dark:bg-slate-950' for dark mode background 
        and 'transition-colors' for smooth switching 
      */}
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
        
        <Sidebar />
        
        <div className="flex-1 md:ml-64 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      
      </div>
    </BrowserRouter>
  );
}

export default App;