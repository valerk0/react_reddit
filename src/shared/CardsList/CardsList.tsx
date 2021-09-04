import React, { useRef } from 'react';
import { Card } from './Card/Card';
import styles from './cardslist.css';
import { usePostsData } from '../../hooks/usePostsData';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store/reducer';
import { postsLoadCounter } from '../../store/posts/actions';
import { IPostsState } from '../../store/posts/reducer';

export function CardsList() {
  const bottomListRef = useRef<HTMLDivElement>(null);
  const { data, loading, error } = usePostsData(bottomListRef);
  const dispatch = useDispatch();
  const token = useSelector<IRootState>(state => state.token.token)
  const { loadCounter } = useSelector<IRootState, IPostsState>(state => state.posts);

  return (
    <ul className={styles.cardsList}>
      {data.map((post) =>
          <Card key={post.id} post={post} />
      )}
      <div className={styles.container}>
        <div ref={bottomListRef} />
        {!token && <div className={styles.loading}>Пожалуйста, залогиньтесь</div>}
        {loading && <div className={styles.loading}>Загрузка...</div>}
        {loadCounter % 3 === 0 && !loading &&
          <button
            onClick={() => {dispatch(postsLoadCounter(loadCounter + 1))}}
            className={styles.moreBtn}
          >
            Загрузить еще
          </button>
        }
        {error && <div role='alert' className={styles.error}>{error}</div>}
      </div>
    </ul>
  );
}
