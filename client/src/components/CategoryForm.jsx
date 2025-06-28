import React, { useState } from 'react';
import { categoryService } from '../services/api';
import './PostForm.css';

const CategoryForm = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await categoryService.createCategory({ name, description });
      setName(''); setDescription('');
      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit} style={{marginTop:'2rem'}} autoComplete="off">
      <h2><span role="img" aria-label="category">🏷️</span> Create Category</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Category Name" required autoFocus />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (optional)" />
      <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Category'}</button>
      {success && <div className="success">Category created!</div>}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default CategoryForm;
