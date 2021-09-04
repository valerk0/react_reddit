import React, { useEffect, useRef, useState } from 'react';
import { IComment } from '../../../../hooks/useCommentsList';
import { Icon } from '../../../Icon';
import { AnswerForm, AnswerFormUncontrolled } from '../AnswerForm';
import { EIcons } from '../MenuItemsList';
import { UserLink } from '../UserLink';
import styles from './commentcard.css';

export function CommentCard({comment}: {comment: IComment}) {
  const [isFormShown, setIsFormShown] = useState(false);
  const [formValue, setFormValue] = useState('');

  function handleAnswerClick() {
    setIsFormShown(true);
    setFormValue(comment.author + ', ');
  }

  return (
    <li className={styles.commentCard}>
      <div className={styles.metaData}>
        <UserLink author={comment.author} />
        <span className={styles.createdAt}>
          <span className={styles.publishedLabel}>
            опубликовано
          </span> {new Date((comment?.created || 1) * 1000).toISOString().slice(0, 19).replace('T', ' ')}
        </span>
      </div>
      <p>{comment.body}</p>
      <ul className={styles.btnList}>
        <li className={styles.btnListItem}><button onClick={handleAnswerClick}>
          <Icon name={EIcons.comment} size={14} />
          <span>Ответить</span>
        </button></li>
        <li className={styles.btnListItem}><button>
          <Icon name={EIcons.share} size={14} />
          <span>Поделиться</span>
        </button></li>
        <li className={styles.btnListItem}><button>
          <Icon name={EIcons.abuse} size={14} />
          <span>Пожаловаться</span>
        </button></li>
      </ul>
      {isFormShown &&
        <AnswerForm value={formValue} setValue={setFormValue} setIsFormShown={setIsFormShown} />
        // <AnswerFormUncontrolled author={comment.author} setIsFormShown={setIsFormShown} />
      }
    </li>
  );
}
