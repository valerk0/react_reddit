import React, {useEffect, useRef, useState} from 'react';
import styles from './post.css';
import ReactDOM from "react-dom";
import {CommentFormControlled} from "../CommentForm";
import { CommentList } from '../CommentList';
import { CommentFormContainer, CommentFormFormikContainer } from '../CommentFormContainer';
import { useHistory, useParams } from 'react-router-dom';

interface IPost {
  title?: string;
  previewLink?: string;
  postId?: string;
  onClose?: () => void;
}
interface params {
  id: string;
}

export function Post({title, previewLink, postId, onClose}: IPost) {

  const [isCommentFormShown, setIsCommentFormShown] = useState(true);
  const postRef = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const params = useParams<params>();

  if (postId !== params.id) return null;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (e.target instanceof Node && !postRef.current?.contains(e.target)) {
        history.push('/');
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const root = document.querySelector('#modal_root');
  if (!root) return null;

  const imgRef = useRef<HTMLImageElement>(null);
  function imgError() {
     if (imgRef.current) {
       imgRef.current.src = 'https://www.howtogeek.com/wp-content/uploads/2019/12/Reddit-Karma-Header.jpg?width=1198&trim=1,1&bg-color=000&pad=1,1';
     }
  }

  return ReactDOM.createPortal((
    <div className={styles.modal} ref={postRef}>
      <h2>{title}</h2>
      <div className={styles.content}>
        <img
          src={previewLink}
          alt="preview"
          className={styles.img}
          onError={imgError}
          ref={imgRef}
        />
      </div>
      {/* {isCommentFormShown && <CommentFormContainer />} */}
      {isCommentFormShown && <CommentFormFormikContainer />}
      <CommentList></CommentList>
    </div>
  ), root);
}
