import React, { useState, useEffect, useRef } from 'react';
import './PostForm.css';
import { postService, categoryService } from '../services/api';

const PostForm = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    categoryService.getAllCategories()
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFeaturedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFeaturedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category', category);
      if (featuredImage) formData.append('featuredImage', featuredImage);
      await postService.createPost(formData, true);
      setTitle(''); setContent(''); setCategory(''); setFeaturedImage(null); setImagePreview(null);
      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off">
      <h2>Create a New Post</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required autoFocus />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" required />
      <select value={category} onChange={e => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>
      <div
        className="image-drop-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{border:'2px dashed #4f8cff',borderRadius:'8px',padding:'1rem',textAlign:'center',background:'#f5faff',marginBottom:'1rem',cursor:'pointer'}}
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" style={{maxWidth:'100%',maxHeight:'180px',borderRadius:'8px',marginBottom:'0.5rem'}} />
        ) : (
          <span style={{color:'#4f8cff'}}>Drag & drop an image here, or click to select</span>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{display:'none'}}
          onChange={handleImageChange}
        />
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Post'}</button>
      {success && <div className="success">Post created successfully!</div>}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default PostForm;
