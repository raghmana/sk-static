import styles from '../styles/home.module.scss';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function loyalTy() {
    return(
        <>
            <Head>
                <title>Loyalty - Sindhu&apos;s Kitchen</title>
                <meta name="description" content="Request catering services from Sindhu&apos;s Kitchen for your special events." />
                <link rel="icon" type="image/x-icon" href="/asset/logo-round.png"></link>
            </Head>
            <div className={styles.loyalty}>
                <h2>SINDHU&apos;S Loyalty Program</h2>
                <Image src="/asset/hero/kolam-mini.png" alt="Sindhu's Kitchen" className={styles.bannerShapes1} width={400} height={170} priority />
                <p>Introducing our exclusive SINDHU&apos;S Loyalty program, designed to reward our cherished customers with enticing benefits and unforgettable experiences.</p>
                <h5>Why Join?</h5>
                <ul>
                    <li>Convenience: Easily track your points and rewards through our website.</li>
                    <li>Community: Be part of a community that values the quality food and rewards your loyalty, making every meal more enjoyable.</li>
                </ul>
                <p>Join SINDHU&apos;S Loyalty Program today and start enjoying the rewards you deserve with every order!</p>
                <h5>Register and Sign In</h5>
                <p>Sign Up for SINDHU&apos;S Rewards for in store and online purchases. If you are an already loyalty member, please login using the registered id/phone number everytime you place your orders to collect points for every food purchased. If you would like to view your points the please login to your account and the balances are automatically shown during the food order. </p>
                <h5>How It Works</h5>
                <p><strong>Credit Accumulation:</strong> 1 credit for every $1 spent on purchasing items</p>
                <h5>Tiers:</h5>
                <ul>
                    <li>Silver: Credit Balance is greater than or equal to 5000 (and more)</li>
                    <li>Golds: Credit Balance is greater than 10000 (and more)</li>
                    <li>Platinum: Credit Balance is greater than 25000</li>
                </ul>
                <h5>Point Accumulation:</h5>
                <ul>
                    <li>Silver Tier: Add 1 points for every $1.00 spent</li>
                    <li>Gold Tier: Add 1.25 points for every $1.00 spent</li>
                    <li>Platinum Tier: Add 1.5 points for every $1.00 spent</li>
                </ul>
                <br />
                <p><strong>Redemption:</strong> $5 for every 200 points accrued.</p>
                <h5>Special Treats for Gold and Plantinum Tier members </h5>
                <p><strong>Marriage Anniversary:</strong> $10 off $100 purchase</p>
                <p><strong>Birthday:</strong> Free hot snack on a purchase of $10 or above</p>
                <h4>Come, be a part of our story, and savor the true essence of Home Food made in traditional way at SINDHU&apos;S! <br /><Link href="https://online.skytab.com/0ce7fe6085d57f82615bd607fa5349a9" className={styles.btn}>Try Our Awesome Food</Link></h4>
                
            </div>
        </>
    );
}