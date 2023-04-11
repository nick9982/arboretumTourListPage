// src/Header.jsx
import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to={'/'}><img src="src/assets/logoArbor.png" className={styles.logo_header}/></Link>
    </header>
  );
};

export default Header;
