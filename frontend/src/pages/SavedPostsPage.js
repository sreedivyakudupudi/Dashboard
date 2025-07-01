// SavedPostsPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SavedPostsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { savedPosts } = location.state || {};

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Saved Posts</h2>
      {savedPosts?.length > 0 ? (
        <ul className="space-y-4 text-gray-700">
          {savedPosts.map((post, index) => (
            <li key={index}>
              <h3 className="font-bold">{post.title}</h3>
              <p>{post.content}</p>
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Go to Post
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No saved posts yet.</p>
      )}
      <button onClick={() => navigate(-1)} className="mt-6 text-blue-600 underline">
        Back
      </button>
    </div>
  );
};

export default SavedPostsPage;
