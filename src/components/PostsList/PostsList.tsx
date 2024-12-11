import React from 'react';
import Post from '../Post/Post';

export default function PostsList(props) {

  const {posts} = props;
    
  return (
    <div>
        {posts && posts.map((post, index) => (
            <Post key={index} post={post}/>
        ))}
    </div>
  );
}
