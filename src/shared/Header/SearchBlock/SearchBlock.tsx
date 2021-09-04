import React, {useContext} from 'react';
import styles from './searchblock.css';
import {UserBlock} from "./UserBlock";
import { useSelector } from 'react-redux';
import { IRootState } from '../../../store/reducer';
import { IUserData, useUserData } from '../../../hooks/useUserData';

export function SearchBlock() {
  const { data, loading } = useUserData();

  return (
    <div className={styles.searchBlock}>
      <UserBlock username={data.name} avatarSrc={data.iconImg} loading={loading} />
    </div>
  );
}
