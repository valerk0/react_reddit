import React, {useEffect, useRef, useState} from 'react';
import styles from './dropdown.css';
import ReactDOM from "react-dom";

interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const NOOP = () => {};

export function Dropdown({ button, children, isOpen, onOpen=NOOP, onClose=NOOP }: IDropdownProps) {
  if (typeof document === 'undefined') return null;
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);

  const btnRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
  useEffect(() => isDropdownOpen ? onOpen() : onClose(), [isDropdownOpen]);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (e.target instanceof Node
        && !dropDownRef.current?.contains(e.target)
        && !btnRef.current?.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);


  const handleOpen = () => {
    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen);
      const offset = btnRef.current?.getBoundingClientRect();
      const docTop = document.documentElement.scrollTop;
      const docLeft = document.documentElement.scrollLeft;
      setStyle(offset ? {
        top: offset.top + offset.height + docTop,
        left: offset.left + offset.width + docLeft
      } : {});
    }
  };

  const root = document.querySelector('#modal_root');
  if (!root) return null;

  return (
    <div className={styles.container}>
      <div onClick={handleOpen} ref={btnRef}>
        { button }
      </div>
      {isDropdownOpen && ReactDOM.createPortal((
        <div className={styles.listContainer} style={style} ref={dropDownRef}>
          <div
            onClick={() => setIsDropdownOpen(false)}
            className={styles.list}
          >
            { children }
          </div>
        </div>
      ), root)}
    </div>
  );
}
