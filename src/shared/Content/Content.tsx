import React from 'react';
import styles from './content.css';

interface IComponentProps {
  children?: React.ReactNode;
}

export function Content({ children }: IComponentProps) {
  return (
    <main className={styles.content}>
      {children}
    </main>
  );
}
