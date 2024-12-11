import React, { useState } from 'react';
import {Button, Dialog, DialogContent, IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function NewPostModal(props) {
  
  const {handleClose, userId, getPosts} = props;

  const [content, setContent] = useState('');

  async function handlePostSubmission() {
    if (content) {
      const response = await fetch(`/apis/posts`, {
        method: 'POST',
        body: JSON.stringify({content: content, id: userId})
      });

      const data = await response.json();

      if (data.message === 'success') {       
        handleClose();
        setContent('');
        getPosts();
      }     
    }
  }

  return (
    <Dialog open>
        <DialogContent sx={{display: 'flex', flexDirection: 'column'}}>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
            <CloseIcon/>
            </IconButton>
            <h2>Create a New Post</h2>
            <textarea
                rows={8}
                cols={50} 
                placeholder='What is this post about?'
                value={content} 
                onChange={(event) => setContent(event.target.value)}
            />
            <Button onClick={handlePostSubmission} sx={{ backgroundColor: "#00531b", marginTop: '10px'}}>
                <Typography sx={{textTransform: 'none', color: 'white'}}>Create New Post</Typography>
            </Button>
        </DialogContent>
    </Dialog>
  );
}
