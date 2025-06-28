import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import PostList from './components/PostList';
import PostView from './components/PostView';
import PostForm from './components/PostForm';
import Login from './components/Login';
import Register from './components/Register';
import CategoryForm from './components/CategoryForm';
import './components/Navigation.css';
import './components/PostList.css';
import './components/PostView.css';
import './components/PostForm.css';
import './components/AuthForm.css';

const App = () => (
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/posts/:id" element={<PostView />} />
      <Route path="/create" element={<PostForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/categories/create" element={<CategoryForm />} />
      {/* Add edit, etc. routes here */}
    </Routes>
  </Router>
);

export default App;
