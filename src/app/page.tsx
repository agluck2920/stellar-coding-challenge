"use client";

import React, { useState, useEffect } from 'react';
import LoginModal from '../components/LoginModal/LoginModal';
import PostModal from '../components/PostModal/PostModal';
import PostsList from '../components/PostsList/PostsList';
import {Box, Button} from '@mui/material';

export default function Home() {

  const [isLoginModalVisible, setLoginModalVisibility] = useState(false);
  const [isPostModalVisible, setPostModalVisibility] = useState(false);
  const [userId, setUserId] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
    setUserId(window.localStorage.getItem('userId'));
  }, []);

  async function getPosts() {
      const response = await fetch(`/apis/posts`);

      const data = await response.json();
      setPosts(data);
  }

  function handleLoginButtonOnClick() {
    if (userId) {
      window.localStorage.clear();
      setUserId('');
    }
    else {
      setLoginModalVisibility(true);
    }
  }
  
  return (
    <React.Fragment>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Button variant='outlined' onClick={handleLoginButtonOnClick}>{userId ? 'Logout': 'Log in / Sign up'}</Button>
        {userId && <Button variant='outlined' onClick={() => setPostModalVisibility(true)}>Create New Post</Button>}
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      {isLoginModalVisible && <LoginModal handleClose={() => setLoginModalVisibility(false)} setUserId={(id) => setUserId(id)}/>}
      {isPostModalVisible && <PostModal handleClose={() => setPostModalVisibility(false)} userId={userId} getPosts={getPosts}/>}
        <PostsList posts={posts}/>
      </Box>
    </React.Fragment>
  );
}
