import React, { useContext } from 'react';
import { cardContext } from '../../../context/cardContext';
import { CommentsButton } from '../CommentsButton';
import { KarmaCounter } from '../KarmaCounter';
import { SaveButton } from '../SaveButton';
import { ShareButton } from '../ShareButton';
import styles from './controls.css';

export function Controls() {
  const {post} = useContext(cardContext);
  return (
    <div className={styles.controls}>
      <KarmaCounter counter={post?.score} />
      <CommentsButton commentsNum={post?.num_comments} />
      <div className={styles.actions}>
        <ShareButton />
        <SaveButton />
      </div>
    </div>
  );
}
