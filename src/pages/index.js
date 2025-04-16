import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Sindhu&apos;s Kitchen</title>
        <meta name="description" content="Request catering services from Sindhu&apos;s Kitchen for your special events." />
        <link rel="icon" type="image/x-icon" href="/asset/logo-round.png"></link>
      </Head>
      <Hero />
      <AboutUs />
    </>
  );
}