const Item = require('../models/Item');

const getItems = async (req, res) => {
  const items = await Item.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(items);
};

const createItem = async (req, res) => {
  const { type, title, content, priority, category, dueDate } = req.body;
  const item = new Item({
    user: req.user._id,
    type,
    title,
    content,
    priority,
    category,
    dueDate
  });
  const createdItem = await item.save();
  res.status(201).json(createdItem);
};

const updateItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item || item.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Item not found' });
  }

  Object.assign(item, req.body);
  const updatedItem = await item.save();
  res.json(updatedItem);
};

const deleteItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item || item.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Item not found' });
  }

  await item.deleteOne();
  res.json({ message: 'Item removed successfully' });
};

module.exports = { getItems, createItem, updateItem, deleteItem };
