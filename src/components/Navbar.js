import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/home.module.scss';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`${styles.navbar} ${hasShadow ? styles.shadow : ''}`}>
      {/* Logo or Brand Name */}
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Image src="/asset/logo.png" alt="Sindhu's Kitchen" width={220} height={70} priority />
        </div>

        {/* Hamburger Menu Icon (for mobile) */}
        <div className={styles.hamburger} onClick={toggleMenu}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>

        {/* Nav Links */}
        <div className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
          <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/menu" onClick={() => setIsMenuOpen(false)}>Menu</Link>
          <Link href="/catering" onClick={() => setIsMenuOpen(false)}>Catering</Link>
          <Link href="/snacks" onClick={() => setIsMenuOpen(false)}>Snacks</Link>
          <Link href="https://www.google.com" className={styles.btn}>Order Now</Link>
        </div>
      </div>
    </nav>
  );
}