import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks]       = useState([]);
  const [title, setTitle]       = useState('');
  const [desc, setDesc]         = useState('');
  const [error, setError]       = useState('');
  const [editId, setEditId]     = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc]   = useState('');

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) { setError('Title is required!'); return; }
    setError('');
    await axios.post(API, { title, description: desc });
    setTitle(''); setDesc('');
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  const startEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
    setEditDesc(task.description);
  };

  const saveEdit = async () => {
    await axios.put(`${API}/${editId}`, { title: editTitle, description: editDesc });
    setEditId(null);
    fetchTasks();
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    await axios.put(`${API}/${task._id}`, { status: newStatus });
    fetchTasks();
  };

  return (
    <div className="app">
      <h1>📝 Task Tracker</h1>

      <div className="form">
        <input
          placeholder="Task title *"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          placeholder="Description (optional)"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="tasks">
        {tasks.length === 0 && <p className="empty">No tasks yet. Add one above!</p>}
        {tasks.map(task => (
          <div key={task._id} className={`task ${task.status}`}>
            {editId === task._id ? (
              <div className="edit-form">
                <input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                <input value={editDesc}  onChange={e => setEditDesc(e.target.value)} />
                <button onClick={saveEdit}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <div className="task-info">
                  <h3>{task.title}</h3>
                  {task.description && <p>{task.description}</p>}
                  <span className={`badge ${task.status}`}>{task.status}</span>
                </div>
                <div className="task-actions">
                  <button onClick={() => toggleStatus(task)}>
                    {task.status === 'pending' ? '✅ Complete' : '↩ Undo'}
                  </button>
                  <button onClick={() => startEdit(task)}>✏️ Edit</button>
                  <button className="del" onClick={() => deleteTask(task._id)}>🗑 Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;