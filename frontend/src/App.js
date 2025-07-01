import React from 'react';
import Feed from './pages/Feed';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import TwitterFeed from './pages/TwitterFeed';
import SavedPostsPage from './pages/SavedPostsPage';
import AdminSavedPosts from './pages/AdminSavedPosts';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />

<Route path="/feed" element={<Feed />} />
<Route path="/admin-panel" element={<AdminPanel />} />
<Route path="/twitter-feed" element={<TwitterFeed />} /> 
<Route path="/saved-posts" element={<SavedPostsPage />} />
<Route path="/adminsaved-posts" element={<AdminSavedPosts/>} />
<Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

