import React, { useState } from 'react';
import styles from '../styles/home.module.scss';

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.acItem}>
      <div className={styles.acTitle} onClick={() => setIsActive(!isActive)}>
        <div>{title}</div>
        <div className={styles.ico}>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <div className={styles.acContent}>{content}</div>}
    </div>
  );
};

export default Accordion;