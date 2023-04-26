// src/Header.jsx
import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <img src="./src/assets/logoArbor.png" className={styles.headerImage}></img>
    </header>
  );
};

export default Header;
