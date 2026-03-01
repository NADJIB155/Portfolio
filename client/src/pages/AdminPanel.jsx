import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, UploadCloud } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  
  // Form State
  const [formData, setFormData] = useState({
    title: '', description: '', category: 'Web Dev', 
    projectType: 'WEB_APP', techStack: '', 
    demoUrl: '', githubUrl: '', image: ''
  });

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!userInfo) navigate('/login');
    else fetchProjects();
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/projects');
      setProjects(data);
    } catch (error) { console.error(error); }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);
    setUploading(true);

    try {
      const config = { 
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${userInfo.token}` } 
      };
      const { data } = await axios.post('http://localhost:5000/api/upload', uploadData, config);
      setFormData({ ...formData, image: data }); 
      setUploading(false);
      toast.success('File Uploaded!');
    } catch (error) {
      console.error(error);
      setUploading(false);
      toast.error('Upload failed');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this project?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.delete(`http://localhost:5000/api/projects/${id}`, config);
        toast.success('Project Deleted');
        fetchProjects();
      } catch (error) { toast.error('Failed to delete'); }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const formattedData = {
        ...formData,
        techStack: formData.techStack.includes(',') ? formData.techStack.split(',').map(t => t.trim()) : [formData.techStack]
      };

      await axios.post('http://localhost:5000/api/projects', formattedData, config);
      toast.success('Project Added!');
      setShowForm(false);
      fetchProjects();
      setFormData({
        title: '', description: '', category: 'Web Dev', 
        projectType: 'WEB_APP', techStack: '', demoUrl: '', githubUrl: '', image: ''
      });
    } catch (error) { toast.error('Error adding project'); }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Toaster />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={20} /> Add Project
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
          <h2 className="text-xl font-bold mb-4">New Project Details</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Project Title" className="p-2 border rounded" required 
              value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            
            <select className="p-2 border rounded" 
              value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option>Web Dev</option>
              <option>Data Analysis</option>
              <option>Automation</option>
              <option>Mobile</option>
            </select>

            <select className="p-2 border rounded"
              value={formData.projectType} onChange={e => setFormData({...formData, projectType: e.target.value})}>
              {/* Force SCRIPT type for Video Demos */}
              <option value="SCRIPT">Automation Script (Video)</option>
              <option value="WEB_APP">Web App (Link)</option>
              <option value="DASHBOARD">Dashboard (Image)</option>
            </select>

            <input placeholder="Tech Stack" className="p-2 border rounded" required 
              value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} />

            <input placeholder="Live Demo URL" className="p-2 border rounded" 
              value={formData.demoUrl} onChange={e => setFormData({...formData, demoUrl: e.target.value})} />

            <input placeholder="GitHub URL" className="p-2 border rounded" 
              value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} />

            {/* --- THIS BUTTON MUST BE VISIBLE --- */}
            <div className="md:col-span-2 border border-dashed border-blue-300 rounded-lg p-4 bg-blue-50">
              <label className="block text-sm font-bold text-blue-800 mb-2">Upload Your Video Here 👇</label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <UploadCloud size={20} />
                  <span>Choose Video File</span>
                  <input type="file" onChange={handleFileUpload} className="hidden" />
                </label>
                {uploading && <span className="text-blue-600 font-bold animate-pulse">Uploading... Please Wait...</span>}
              </div>
              {formData.image && <p className="text-green-600 text-sm mt-2 font-bold">✅ File Uploaded Successfully!</p>}
            </div>
            {/* ----------------------------------- */}

            <textarea placeholder="Description" className="p-2 border rounded md:col-span-2 h-24" required 
              value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />

            <button disabled={uploading || !formData.image} className={`text-white py-2 rounded font-bold md:col-span-2 ${uploading || !formData.image ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}>
              Submit Project
            </button>
          </form>
        </div>
      )}

      {/* Projects List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr><th className="p-4 text-slate-600">Title</th><th className="p-4 text-slate-600">Category</th><th className="p-4 text-slate-600">Action</th></tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="p-4 font-medium">{project.title}</td>
                <td className="p-4 text-slate-500">{project.category}</td>
                <td className="p-4"><button onClick={() => handleDelete(project._id)} className="text-red-500 p-2"><Trash2 size={20}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;