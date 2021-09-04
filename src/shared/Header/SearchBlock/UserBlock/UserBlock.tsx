import React from 'react';
import styles from './userblock.css';
import {Break} from "../../../Break";
import {EColors, Text} from "../../../Text";
import {IconAnon} from "../../../Icons/IconAnon";

interface IUserBlockProps {
  avatarSrc?: string;
  username?: string;
  loading?: boolean;
}

export function UserBlock({ avatarSrc, username, loading }: IUserBlockProps) {
  return (
    <a
      href='https://www.reddit.com/api/v1/authorize?client_id=48fB6wIHE-uYwS4pEtq4Jw&response_type=code&state=randomstring&redirect_uri=http://localhost:3000/auth&duration=permanent&scope=read submit identity'
      className={styles.userBox}
    >
      <div className={styles.avatarBox}>
        {avatarSrc
          ? <img src={avatarSrc} alt="user avatar" className={styles.avatarImage} />
          : <IconAnon />
        }
      </div>
      <div className={styles.username}>
        <Break size={12} />
        {
          loading
          ? <Text size={20} color={EColors.grey99}>Загрузка...</Text>
          : <Text size={20} color={username ? EColors.black : EColors.grey99}>{username || 'Аноним'}</Text>
        }

      </div>
    </a>
  );
}
