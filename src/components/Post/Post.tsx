import React from 'react';
import {Box, Card, CardContent, Typography} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function Post(props) {

  const {post} = props;

  return (
    <Box sx={{ width: 500, marginTop: '20px', }}>
      <Card variant="outlined" sx={{backgroundColor: 'lightblue'}}>
        <CardContent>
            <Typography variant='h5'>
                {post.author}
            </Typography>
            <Typography sx={{display: 'flex', alignItems: 'center', marginTop: '10px'}}>
               <AccessTimeIcon sx={{marginRight: '5px'}}/> 
               {post.createdAt}
            </Typography>
            <Typography sx={{marginTop: '10px'}}>
                {post.content}
            </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
