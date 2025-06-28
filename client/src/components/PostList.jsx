import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postService } from '../services/api';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    postService.getAllPosts()
      .then(res => setPosts(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    (post.category?.name || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="center">Loading...</div>;
  if (error) return <div className="center error">Error: {error}</div>;

  return (
    <div className="post-list-container">
      <h2>Blog Posts</h2>
      <input
        className="search-bar"
        type="text"
        placeholder="Search posts or categories..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{marginBottom:'1.5rem',padding:'0.7rem 1rem',borderRadius:'8px',border:'1px solid #e0e0e0',fontSize:'1rem',width:'100%'}}
      />
      <ul className="post-list">
        {filteredPosts.length > 0 ? filteredPosts.map(post => (
          <li key={post._id} className="post-list-item">
            <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
              <Link to={`/posts/${post._id}`}>{post.title}</Link>
              <span className="category-badge">{post.category?.name || 'Uncategorized'}</span>
              <span className="post-meta">{post.createdAt && new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </li>
        )) : <li style={{padding:'2rem',textAlign:'center',color:'#888'}}>No posts found.</li>}
      </ul>
    </div>
  );
};

export default PostList;
