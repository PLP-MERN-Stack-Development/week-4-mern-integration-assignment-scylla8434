import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postService } from '../services/api';
import './PostView.css';

const PostView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [animatingComment, setAnimatingComment] = useState(false);

  useEffect(() => {
    postService.getPost(id)
      .then(res => setPost(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    setCommentError(null);
    setCommentSuccess(false);
    try {
      await postService.addComment(id, { content: comment });
      setComment('');
      setCommentSuccess(true);
      setAnimatingComment(true);
      // Refresh post to show new comment
      const res = await postService.getPost(id);
      setPost(res.data);
      setTimeout(() => setAnimatingComment(false), 700);
    } catch (err) {
      setCommentError(err.response?.data?.error || err.message);
    }
  };

  if (loading) return <div className="center">Loading...</div>;
  if (error) return <div className="center error">Error: {error}</div>;
  if (!post) return <div className="center">Post not found</div>;

  return (
    <div className="post-view-container">
      <h2>{post.title}</h2>
      <div className="post-meta">
        <span className="category-badge" style={{background: '#4f8cff', color: '#fff', borderRadius: '8px', padding: '2px 10px', fontSize: '0.95rem', marginRight: '0.7rem'}}>
          {post.category?.name || 'Uncategorized'}
        </span>
        {post.createdAt && <span style={{color:'#888', fontSize:'0.95rem'}}>Posted {new Date(post.createdAt).toLocaleDateString()}</span>}
      </div>
      {post.featuredImage && (
        <div className="post-image-wrapper">
          <img src={post.featuredImage} alt="Featured" className="post-featured-image" />
        </div>
      )}
      <div className="post-content">{post.content}</div>
      <h3>Comments</h3>
      <ul className={`comments-list${animatingComment ? ' animating' : ''}`}>
        {post.comments && post.comments.length > 0 ? post.comments.map((c, i) => (
          <li key={i} className="comment-item">
            <img className="avatar" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.user?.username || 'User')}&background=4f8cff&color=fff&size=64`} alt="avatar" />
            <div className="comment-content">
              <span className="comment-user">{c.user?.username || 'User'}:</span> {c.content}
              <span className="comment-date">{new Date(c.createdAt).toLocaleString()}</span>
            </div>
          </li>
        )) : <li>No comments yet.</li>}
      </ul>
      <form className="comment-form" onSubmit={handleComment} autoComplete="off">
        <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Add a comment..." required />
        <button type="submit">Add Comment</button>
        {commentSuccess && <div className="success">Comment added!</div>}
        {commentError && <div className="error">{commentError}</div>}
      </form>
      <Link to="/" className="back-link">← Back to Posts</Link>
    </div>
  );
};

export default PostView;
