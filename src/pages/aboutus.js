import styles from '../styles/home.module.scss';
import Head from 'next/head';
import Link from 'next/link';

export default function aboutUs() {
    return(
        <>
            <Head>
                <title>About Us - SINDHU&apos;s</title>
            </Head>
            <div className={styles.aboutUs}>
                <h2>About SINDHU&apos;s</h2>
                <p>At SINDHU&apos;s, we are more than just a restaurant—we are a legacy of authentic South Indian flavors passed down through three generations. Our journey began in 2001, but our culinary story dates back 39 years, rooted in the love and passion for traditional South Indian food and sweets. What started as a humble home kitchen has grown into a trusted destination where food lovers can experience the richness of authentic South Indian cuisine.</p>
                <p>Our recipes are inspired by the heart of South India, carefully crafted to preserve the authenticity and time-honored traditions of our ancestors. We take pride in using the finest and freshest ingredients, ensuring every dish is healthy, flavorful, and true to its origins. From the crispy, golden dosas and soft, fluffy idlis to the aromatic biryanis and indulgent sweets, every bite at SINDHU&apos;s Kitchen is a celebration of heritage and taste.</p>
                <p>At SINDHU&apos;s, we believe that food is not just about taste—it&apos;s about memories, culture, and togetherness. That&apos;s why we strive to create an experience that brings warmth and nostalgia with every meal. Whether you&apos;re enjoying a quick bite, a family feast, or a festive treat, our doors are always open to serve you with love and tradition.</p>
                <p>At SINDHU&apos;s, our passion for South Indian cuisine goes beyond just serving food—we aim to create an experience that transports you to the bustling streets and vibrant kitchens of South India. Every dish we serve is a tribute to our heritage, prepared with traditional techniques and time-honored spices that have been cherished for generations. Whether it&apos;s the comforting flavors of a perfectly spiced sambar, the delicate texture of a freshly steamed idli, or the irresistible sweetness of a handcrafted Mysore Pak, we ensure that every meal carries the essence of home-cooked authenticity.</p>
                <p>Our journey is a testament to the dedication and love we put into our food. We have grown from a small family-run kitchen into a restaurant that welcomes food lovers from all walks of life, all while staying true to our roots. As we continue to serve our community, we remain committed to the values that built us—quality, tradition, and heartfelt hospitality. So, whether you&apos;re a longtime fan of South Indian cuisine or discovering it for the first time, SINDHU&apos;s Kitchen invites you to experience the magic of flavors that have stood the test of time.</p>
                <h4>Come, be a part of our story, and savor the true essence of South India at SINDHU&apos;s! <br /><Link href="https://online.skytab.com/0ce7fe6085d57f82615bd607fa5349a9" className={styles.btn}>Try Our Awesome Food</Link></h4>
                
            </div>
        </>
    );
}