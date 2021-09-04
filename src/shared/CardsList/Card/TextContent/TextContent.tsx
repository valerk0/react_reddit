import React, { useContext } from 'react';
import { cardContext } from '../../../context/cardContext';
import { Title } from '../Title';
import { UserLink } from '../UserLink';
import styles from './textcontent.css';

export function TextContent() {
  const {post} = useContext(cardContext);
  return (
    <div className={styles.textContent}>
      <div className={styles.metaData}>
        <UserLink author={post?.author} />
        <span className={styles.createdAt}>
          <span className={styles.publishedLabel}>
            опубликовано
          </span> {new Date((post?.timeCode || 1) * 1000).toISOString().slice(0, 19).replace('T', ' ')}
        </span>
      </div>
      <Title />
    </div>
  );
}
