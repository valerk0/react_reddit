import React, { useState } from 'react';
import styles from './card.css';
import { Controls } from './Controls';
import { Menu } from './Menu';
import { Preview } from './Preview';
import { TextContent } from './TextContent';
import { CardContextProvider } from '../../context/cardContext';
import { IPostData } from '../../../store/posts/actions';
import { Route } from 'react-router-dom';
import { Post } from './Post';

export function Card({post}: {post:IPostData}) {
  return (
    <li className={styles.card}>
      <CardContextProvider post={post} >
        <TextContent />
        <Preview />
        <Menu />
        <Controls />
        <Route path='/posts/:id'>
          <Post title={post?.title} previewLink={post?.previewLink} postId={post?.id} />
        </Route>
      </CardContextProvider>
    </li>
  );
}
