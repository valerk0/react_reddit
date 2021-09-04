import React, { RefObject, useContext } from 'react';
import { IComment } from '../../../../hooks/useCommentsList';
import { cardContext } from '../../../context/cardContext';
import { CommentCard } from '../CommentCard';
import styles from './commentlist.css';

export function CommentList() {
  const {commentsList} = useContext(cardContext);
  if (!commentsList) return null;
  return (
    <ul className={styles.commentList}>
      {commentsList.map((comment: IComment) =>
        <CommentCard key={comment.id} comment={comment} />
      )}
    </ul>
  );
}
