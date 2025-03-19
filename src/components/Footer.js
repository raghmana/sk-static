import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/home.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.brand}>
          <Image src="/asset/logo-round.png" alt="Sindhu's Kitchen" width={100} height={100} priority />
          <p>Whether you&apos;re craving crispy bites or savory treats, we&apos;ve got you covered. Come enjoy a taste of India and treat yourself to snacks that hit the spot!</p>
          <h4>Opening Hours</h4>
          <p><label>Sunday - Saturday: </label><label>11:00 AM to 9:00 PM</label></p>
          <p><label>Tuesday: </label><label>CLOSED</label></p>
        </div>
        <div class={styles.navLinks}>
          <h4>Navigation</h4>
          <Link href="/aboutus" onClick={() => setIsMenuOpen(false)}>About Us</Link>
          <Link href="/menu" onClick={() => setIsMenuOpen(false)}>Menu</Link>
          <Link href="/catering" onClick={() => setIsMenuOpen(false)}>Catering</Link>
          <Link href="/snacks" onClick={() => setIsMenuOpen(false)}>Snacks</Link>
        </div>
        <div></div>
        <div></div>
      </div>
      <p className={styles.copy}>&copy; 2025 Sindhu’s Kitchen, LLC 2025 All Rights Reserved</p>
    </footer>
  );
}