import React from 'react';
import styles from './icon.css';
import classNames from 'classnames';

type TIconSize = 4 | 8 | 12 | 14 | 16 | 20;

interface IIconProps {
  name: string;
  size: TIconSize;
  mobileSize?: TIconSize;
  tabletSize?: TIconSize;
  desctopSize?: TIconSize;
}

export function Icon(props: IIconProps) {
  const {
    name,
    size,
    mobileSize,
    tabletSize,
    desctopSize,
  } = props;

  const svg = require(`../Icons/${name}.svg`);

  return (
    <img src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
      alt={name}
      className={classNames(
        styles[`s${size}`],
        { [styles[`mobile_s${mobileSize}`]]: mobileSize },
        { [styles[`tablet_s${tabletSize}`]]: tabletSize },
        { [styles[`desctop_s${desctopSize}`]]: desctopSize },
      )}
    />
  );
}
