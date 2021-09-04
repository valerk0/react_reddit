import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsSortBy } from '../../../store/posts/actions';
import { IRootState } from '../../../store/reducer';
import { Dropdown } from '../../Dropdown';
import { Icon } from '../../Icon';
import styles from './sortblock.css';

export function SortBlock() {
  const sortBy = useSelector<IRootState>(state => state.posts.sortBy);
  const dispatch = useDispatch();

  const dropDownBtn = classNames(styles.menuButton, styles.dropDownBtn);

  return (
    <div >
      <Dropdown
        button={
          <button className={styles.menuButton}>
            <Icon name={'rocketIcon'} size={14} />
            <span className={styles.btnText}>{sortBy === 'best' ? 'Лучшие' : 'Новые'}</span>
            <Icon name={'downIcon'} size={14} />
          </button>
        }
      >
        <ul className={styles.dropdown}>
          <li onClick={() => dispatch(postsSortBy('best'))} className={dropDownBtn}>
            <Icon name='rocketIcon' size={14} />
            <span className={styles.btnText}>Лучшие</span>
          </li>
          <li className={styles.divider}></li>
          <li onClick={() => dispatch(postsSortBy('new'))} className={dropDownBtn}>
            <Icon name='rocketIcon' size={14} />
            <span className={styles.btnText}>Новые</span>
          </li>
        </ul>
      </Dropdown>
    </div>
  );
}
