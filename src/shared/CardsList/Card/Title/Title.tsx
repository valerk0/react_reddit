import React, {useContext} from 'react';
import styles from './title.css';
import { cardContext } from '../../../context/cardContext';
import { Link } from 'react-router-dom';

export function Title() {
  const {post} = useContext(cardContext);
  return (
    <h2 className={styles.title}>
      <Link to={`/posts/${post?.id}`} className={styles.postLink}>
        {post?.title}
      </Link>
    </h2>
  );
}
