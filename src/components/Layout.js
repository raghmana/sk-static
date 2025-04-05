import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head';
import NotificationBar from './NotificationBar';
import styles from '../styles/home.module.scss';

export default function Layout({ children }) {
  const [hasNotification, setHasNotification] = useState(false);


  return (
    <>
      <Head>
          <title>Sindhu&apos;s Kitchen</title>
      </Head>
      <NotificationBar />
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />  
    </>
  );
}