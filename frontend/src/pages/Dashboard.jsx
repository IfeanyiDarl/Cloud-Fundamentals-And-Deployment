import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import ItemCard from '../components/ItemCard';
import { Plus, Search, Filter } from 'lucide-react';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  // New Item State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('todo');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('General');
  const [dueDate, setDueDate] = useState('');

  const config = { headers: { Authorization: `Bearer ${user.token}` } };

  const fetchItems = async () => {
    const { data } = await axios.get('http://localhost:5001/api/items', config);
    setItems(data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await axios.post('http://localhost:5001/api/items', { title, content, type, priority, category, dueDate }, config);
    setTitle(''); setContent(''); setDueDate('');
    fetchItems();
  };

  const handleToggle = async (id, isCompleted) => {
    await axios.put(`http://localhost:5001/api/items/${id}`, { isCompleted }, config);
    fetchItems();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5001/api/items/${id}`, config);
    fetchItems();
  };

  const filteredItems = items.filter(i => {
    const matchesType = filterType === 'all' || i.type === filterType;
    const matchesSearch = i.title.toLowerCase().includes(search.toLowerCase()) || 
                          i.category.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  const todos = items.filter(i => i.type === 'todo');
  const completedTodos = todos.filter(i => i.isCompleted);
  const progress = todos.length ? Math.round((completedTodos.length / todos.length) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Creation Panel */}
      <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 h-fit">
        <h2 className="text-lg font-bold text-indigo-400 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" /> Create Entry
        </h2>
        <form onSubmit={handleCreate} className="space-y-3">
          <div className="flex gap-2 p-1 bg-slate-900 rounded-lg">
            {['todo', 'note'].map((t) => (
              <button 
                key={t} type="button" onClick={() => setType(t)}
                className={`flex-1 py-1 text-xs capitalize font-semibold rounded ${type === t ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                {t}
              </button>
            ))}
          </div>

          <input 
            type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500"
            required 
          />

          <textarea 
            placeholder="Content / Description" value={content} onChange={e => setContent(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 h-24"
          />

          <div className="grid grid-cols-2 gap-2">
            <select value={priority} onChange={e => setPriority(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs">
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <input 
              type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs"
            />
          </div>

          {type === 'todo' && (
            <input 
              type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-400"
            />
          )}

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm py-2 rounded-lg transition">
            Save Item
          </button>
        </form>
      </div>

      {/* Main Workspace */}
      <div className="md:col-span-2 space-y-4">
        {/* Progress Tracker */}
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-slate-200">Task Completion Metric</h4>
            <p className="text-xs text-slate-400">{completedTodos.length} of {todos.length} tasks finished</p>
          </div>
          <div className="text-2xl font-extrabold text-indigo-400">{progress}%</div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input 
              type="text" placeholder="Search by title or category..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 pl-9 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="bg-slate-800 border border-slate-700 px-3 py-2 rounded-lg text-sm text-slate-300">
            <option value="all">All Items</option>
            <option value="todo">To-Dos</option>
            <option value="note">Notes</option>
          </select>
        </div>

        {/* List Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredItems.map(item => (
            <ItemCard key={item._id} item={item} onToggle={handleToggle} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}
