import React from 'react';
import { indexTemplate } from '../../server/indexTemplate';
import styles from './genericlist.css';

interface IItem {
  text?: string;
  id: string;
  onClick: (id: string) => void;
  className?: string;
  As?: 'a' | 'li' | 'button' | 'div';
  href?: string;
  icon?: React.ReactNode;
}

interface IGenericListProps {
  list: IItem[];
}

const noop = () => {};

export function GenericList({ list }: IGenericListProps) {
  return (
    <>
      {list.map(({ As = 'div', text, onClick = noop, className, id, href, icon }) => (
        <As
          className={className}
          onClick={() => onClick(id)}
          key={id}
          href={href}
        >
          {icon}
          <span>{text}</span>
        </As>
      ))}
    </>
  );
}
