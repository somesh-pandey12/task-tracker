import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/tasks`;

const FILTERS = ['All', 'Pending', 'Completed'];

export default function App() {
  const [tasks, setTasks]         = useState([]);
  const [title, setTitle]         = useState('');
  const [desc, setDesc]           = useState('');
  const [error, setError]         = useState('');
  const [filter, setFilter]       = useState('All');
  const [editId, setEditId]       = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc]   = useState('');
  const [loading, setLoading]     = useState(false);
  const [toast, setToast]         = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchTasks(); }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setTasks(res.data);
    } catch (err) {
      showToast('Cannot connect to server');
    }
    setLoading(false);
  };

  const addTask = async () => {
    if (!title.trim()) { setError('Task title is required.'); return; }
    setError('');
    await axios.post(API, { title: title.trim(), description: desc.trim() });
    setTitle('');
    setDesc('');
    showToast('Task added!');
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    showToast('Task deleted');
    fetchTasks();
  };

  const startEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
    setEditDesc(task.description);
  };

  const saveEdit = async () => {
    if (!editTitle.trim()) return;
    await axios.put(`${API}/${editId}`, { title: editTitle.trim(), description: editDesc.trim() });
    setEditId(null);
    showToast('Task updated!');
    fetchTasks();
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    await axios.put(`${API}/${task._id}`, { status: newStatus });
    fetchTasks();
  };

  const filtered = tasks.filter(function(t) {
    if (filter === 'All') return true;
    return t.status === filter.toLowerCase();
  });

  const counts = {
    all: tasks.length,
    pending: tasks.filter(function(t) { return t.status === 'pending'; }).length,
    completed: tasks.filter(function(t) { return t.status === 'completed'; }).length,
  };

  return (
    <div className="page">
      {toast && <div className="toast">{toast}</div>}

      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-icon">T</div>
            <span>TaskFlow</span>
          </div>
          <div className="stats">
            <div className="stat"><span>{counts.all}</span>Total</div>
            <div className="stat"><span>{counts.pending}</span>Pending</div>
            <div className="stat done"><span>{counts.completed}</span>Done</div>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="card add-card">
          <h2>Add New Task</h2>
          <div className="input-group">
            <input
              className={error ? 'input error-input' : 'input'}
              placeholder="What needs to be done?"
              value={title}
              onChange={function(e) { setTitle(e.target.value); setError(''); }}
              onKeyDown={function(e) { if (e.key === 'Enter') addTask(); }}
            />
            {error && <p className="error-msg">{error}</p>}
            <input
              className="input"
              placeholder="Add a description (optional)"
              value={desc}
              onChange={function(e) { setDesc(e.target.value); }}
            />
          </div>
          <button className="btn-primary" onClick={addTask}>+ Add Task</button>
        </div>

        <div className="filters">
          {FILTERS.map(function(f) {
            return (
              <button
                key={f}
                className={filter === f ? 'filter-btn active' : 'filter-btn'}
                onClick={function() { setFilter(f); }}
              >
                {f}
                <span className="filter-count">
                  {f === 'All' ? counts.all : f === 'Pending' ? counts.pending : counts.completed}
                </span>
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="empty-state">Loading tasks...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <p>{filter === 'All' ? 'No tasks yet. Add one above!' : 'No ' + filter.toLowerCase() + ' tasks.'}</p>
          </div>
        ) : (
          <div className="task-list">
            {filtered.map(function(task) {
              return (
                <div key={task._id} className={'task-card ' + task.status}>
                  {editId === task._id ? (
                    <div className="edit-mode">
                      <input className="input" value={editTitle} onChange={function(e) { setEditTitle(e.target.value); }} />
                      <input className="input" value={editDesc}  onChange={function(e) { setEditDesc(e.target.value); }} />
                      <div className="edit-actions">
                        <button className="btn-primary small" onClick={saveEdit}>Save</button>
                        <button className="btn-ghost small" onClick={function() { setEditId(null); }}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%'}}>
                      <div className="task-left">
                        <button
                          className={task.status === 'completed' ? 'check-btn checked' : 'check-btn'}
                          onClick={function() { toggleStatus(task); }}
                        >
                          {task.status === 'completed' ? '✓' : ''}
                        </button>
                        <div className="task-body">
                          <p className={task.status === 'completed' ? 'task-title striked' : 'task-title'}>
                            {task.title}
                          </p>
                          {task.description && <p className="task-desc">{task.description}</p>}
                        </div>
                      </div>
                      <div className="task-right">
                        <span className={'badge ' + task.status}>
                          {task.status === 'completed' ? 'Done' : 'Pending'}
                        </span>
                        <button className="icon-btn" onClick={function() { startEdit(task); }}>✏️</button>
                        <button className="icon-btn danger" onClick={function() { deleteTask(task._id); }}>🗑</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}