import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CreatePostForm from './components/CreatePostForm';
import CreateCommentForm from './components/CreateCommentForm';
import CreateCommunityForm from './components/CreateCommunityForm';
import ConnectWallet from './components/ConnectWallet';
import PostList from './components/PostList';
import CommunityList from './components/CommunityList';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Welcome to the DApp</h1>
        <ConnectWallet />
        <nav>
          <Link to="/">Home</Link> |
          <Link to="/create-community">Create Community</Link> |
          <Link to="/create-post">Create Post</Link> |
          <Link to="/create-comment">Create Comment</Link>
        </nav>
        <Routes>
          <Route path="/" element={<CommunityList />} />
          <Route path="/create-community" element={<CreateCommunityForm />} />
          <Route path="/create-post" element={<CreatePostForm />} />
          <Route path="/create-comment" element={<CreateCommentForm />} />
          <Route path="/community/:communityId/*" element={<PostList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
