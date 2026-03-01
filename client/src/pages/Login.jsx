import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send credentials to backend
      const { data } = await axios.post('http://localhost:5000/api/users/login', formData);
      
      // Save the token to LocalStorage (This is your digital ID card)
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      toast.success('Welcome back, Nadjib!');
      
      // Redirect to Admin Panel after 1 second
      setTimeout(() => {
        navigate('/admin');
      }, 1000);

    } catch (error) {
      toast.error('Invalid Email or Password');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-50">
      <Toaster />
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-slate-800">Admin Login</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="admin@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button className="bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors mt-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;