import React from 'react';
import { Check, Trash2, Calendar, Tag } from 'lucide-react';

export default function ItemCard({ item, onToggle, onDelete }) {
  const priorityColors = {
    low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    medium: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    high: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
  };

  return (
    <div className={`p-4 rounded-xl border bg-slate-800/60 border-slate-700/80 flex flex-col justify-between transition hover:border-slate-600 ${item.isCompleted ? 'opacity-50' : ''}`}>
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 text-xs rounded-full border ${priorityColors[item.priority]}`}>
              {item.priority}
            </span>
            <span className="text-xs text-slate-400 border border-slate-700 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Tag className="w-3 h-3" /> {item.category}
            </span>
          </div>
          <span className="text-xs uppercase font-bold text-slate-500 tracking-wide">{item.type}</span>
        </div>

        <h3 className={`font-semibold text-lg ${item.isCompleted ? 'line-through text-slate-400' : 'text-slate-100'}`}>
          {item.title}
        </h3>
        
        {item.content && <p className="text-slate-400 text-sm mt-1 whitespace-pre-line">{item.content}</p>}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700/50">
        {item.dueDate ? (
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {new Date(item.dueDate).toLocaleDateString()}
          </span>
        ) : <span />}

        <div className="flex items-center gap-2">
          {item.type === 'todo' && (
            <button 
              onClick={() => onToggle(item._id, !item.isCompleted)} 
              className={`p-1.5 rounded-lg border transition ${item.isCompleted ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-600 text-slate-400 hover:text-slate-100'}`}
            >
              <Check className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={() => onDelete(item._id)} 
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

