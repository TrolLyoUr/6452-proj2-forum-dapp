import React, { Component } from 'react';
import CreatePostForm from './components/CreatePostForm';
import CreateCommentForm from './components/CreateCommentForm';
import CreateCommunityForm from './components/CreateCommunityForm';
import ConnectWallet from './components/ConnectWallet';
import PostList from './components/PostList';
// import CommentList from './components/CommentList';
import CommunityList from './components/CommunityList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to the DApp</h1>
        <ConnectWallet />
        <CreateCommunityForm />
        <CreatePostForm />
        <CreateCommentForm />
        <h2>Communities</h2>
        <CommunityList />
        <PostList />
        {/* <h2>Comments</h2>
        <CommentList /> */}
      </div>
    );
  }
}

export default App;
