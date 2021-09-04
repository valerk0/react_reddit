import React, { useContext, useRef } from 'react';
import { cardContext } from '../../../context/cardContext';
import styles from './preview.css';

export function Preview() {
  const {post} = useContext(cardContext);

  const imgRef = useRef<HTMLImageElement>(null);
  function imgError() {
     if (imgRef.current) {
       imgRef.current.src = 'https://www.howtogeek.com/wp-content/uploads/2019/12/Reddit-Karma-Header.jpg?width=1198&trim=1,1&bg-color=000&pad=1,1';
     }
  }

  return (
    <div className={styles.preview}>
      <img
        src={post?.previewLink}
        alt="preview" className={styles.previewImg}
        onError={imgError}
        ref={imgRef}
      />
    </div>
  );
}
