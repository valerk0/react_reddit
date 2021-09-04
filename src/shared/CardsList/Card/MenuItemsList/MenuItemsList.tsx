import React from 'react';
import styles from './menuitemslist.css';
import { GenericList } from '../../../GenericList';
import { generateId } from '../../../../utils/react/generateRandomIndex';
import { merge } from '../../../../utils/js/merge';
import classNames from 'classnames';
import { Icon } from '../../../Icon';

const itemClasses = styles.menuItem;
const itemMobileHiddenClasses = classNames(styles.menuItem, styles.mobileHidden);
const dividerClasses = styles.divider;
const dividerMobileHiddenClasses = classNames(styles.divider, styles.mobileHidden);

export enum EIcons {
  comment = 'commentIcon',
  share = 'shareIcon',
  hide = 'hideIcon',
  save = 'saveIcon',
  abuse = 'abuseIcon',
}

const LIST = [
  {icon: <Icon name={EIcons.comment} size={14} />, text: 'Комментарии', className: itemMobileHiddenClasses},
  {className: dividerMobileHiddenClasses},
  {icon: <Icon name={EIcons.share} size={14} />, text: 'Поделиться', className: itemMobileHiddenClasses},
  {className: dividerMobileHiddenClasses},
  {icon: <Icon name={EIcons.hide} size={14} />, text: 'Скрыть', className: itemClasses},
  {className: dividerClasses},
  {icon: <Icon name={EIcons.save} size={14} />, text: 'Сохранить', className: itemMobileHiddenClasses},
  {className: dividerMobileHiddenClasses},
  {icon: <Icon name={EIcons.abuse} size={14} />, text: 'Пожаловаться', className: itemClasses},
].map(generateId);

interface IMenuItemsListProps {
  postId: string;
}

export function MenuItemsList({ postId }: IMenuItemsListProps) {
  const [list, setList] = React.useState(LIST);

  const handleClick = (id: string) => {
    console.log(`post ${postId}, item ${id}`);
  }

  return (
    <ul className={styles.menuItemsList}>
      <GenericList list={list.map(merge({onClick: handleClick, As: 'li' as const}))} />
    </ul>

  );
}
