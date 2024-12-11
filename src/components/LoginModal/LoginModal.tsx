import React, { useState } from 'react';
import {Button, Dialog, DialogActions, DialogContent, IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuidv4 } from 'uuid';

export default function LoginModal(props) {
  
  const {handleClose, setUserId} = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginModal, setIsLoginModal] = useState(true);

  async function handleUserSubmission() {
    if (email !== '' && password !== '') {
      let response;

      if (isLoginModal) {
        response = await fetch(`/apis/login`, {
          method: 'POST',
          body: JSON.stringify({email: email, password: password})
        });
      } else {
        response = await fetch(`/apis/register`, {
          method: 'POST',
          body: JSON.stringify({id: uuidv4(), email: email, password: password})
        });
      }

      const data = await response.json();
        
      if (data.message === 'success') {
        localStorage.setItem('jwt-token', data.token);
        localStorage.setItem('userId', data.id);
        setUserId(data.id);
        handleClose();
        setEmail('');
        setPassword('');
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
            <h2>{isLoginModal ? `Log in to` : 'Sign up for'} Message Board</h2>
            <input 
                name='email' 
                placeholder='Enter Email'
                type='text'
                value={email} 
                onChange={(event) => setEmail(event.target.value)}
            />
            <input 
                name='password' 
                placeholder='Password'
                type='text'
                value={password} 
                onChange={(event) => setPassword(event.target.value)}
            />
            <Button onClick={handleUserSubmission} sx={{ backgroundColor: "#00531b", marginTop: '10px'}}>
                <Typography sx={{textTransform: 'none', color: 'white'}}>{isLoginModal ? 'Log in' : 'Sign up'}</Typography>
            </Button>
        </DialogContent>
        <DialogActions>
            <div>{isLoginModal ? `Don't have an account?` : `Already have an account?`}</div>
          <Button onClick={() => setIsLoginModal(!isLoginModal)}>
           <Typography sx={{textTransform: 'none'}}>{isLoginModal ? 'Sign up' : 'Log in'}</Typography>
          </Button>
        </DialogActions>
    </Dialog>
  );
}
