import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head';
import styles from '../styles/home.module.scss';

export default function Layout({ children }) {
  return (
    <>
        <Head>
            <title>Sindhu&apos;s Kitchen</title>
        </Head>
        
        <Navbar />
        <main className={styles.main}>{children}</main>
        <Footer />
        
    </>
  );
}