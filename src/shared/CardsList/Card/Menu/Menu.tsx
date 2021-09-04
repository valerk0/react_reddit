import React from 'react';
import styles from './menu.css';
import { Dropdown } from '../../../Dropdown';
import { MenuItemsList } from '../MenuItemsList';
import { Icon } from '../../../Icon';

export function Menu() {
  return (
    <div className={styles.menu}>
      <Dropdown
        button={
          <button className={styles.menuButton}>
            <Icon name={'menuIcon'} size={20} />
          </button>
        }
      >
        <div className={styles.dropdown}>
          <MenuItemsList postId='1234'/>
          <button className={styles.closeButton}>Закрыть</button>
        </div>
      </Dropdown>
    </div>
  );
}
