const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://task-tracker-jwmx.vercel.app'  
  ]
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ DB Error:', err));

const taskSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, default: '' },
  status:      { type: String, default: 'pending' },
  createdAt:   { type: Date,   default: Date.now }
});
const Task = mongoose.model('Task', taskSchema);

// GET all tasks
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});

// CREATE task
app.post('/api/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// UPDATE task
app.put('/api/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// DELETE task
app.delete('/api/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));