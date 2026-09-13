const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['todo', 'note'], required: true },
  title: { type: String, required: true },
  content: { type: String, default: '' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  category: { type: String, default: 'General' },
  isCompleted: { type: Boolean, default: false },
  dueDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
