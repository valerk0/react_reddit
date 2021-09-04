import React, { useContext, useRef } from 'react';
import styles from './userlink.css';
import {useAuthorData} from "../../../../hooks/useAuthorData";
import { cardContext } from '../../../context/cardContext';

export function UserLink({author}: {author?: string}) {
  const [authorData] = useAuthorData(author || '');

  const imgRef = useRef<HTMLImageElement>(null);
  function imgError() {
     if (imgRef.current) {
       imgRef.current.src = 'https://www.redditstatic.com/avatars/avatar_default_05_FF4500.png';
     }
  }

  return (
    <div className={styles.userLink}>
      <img
        src={authorData.iconImg}
        alt="avatar" className={styles.avatar}
        onError={imgError}
        ref={imgRef}
      />
      <a href="#user-url" className={styles.username}>
        {authorData.name}
      </a>
    </div>
  );
}
