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
                <p>Introducing our exclusive SINDHU&apos;S Loyalty, designed to reward our cherished customers with enticing benefits and unforgettable experiences.</p>
                <h5>Why Join?</h5>
                <ul>
                    <li>Convenience: Easily track your points and rewards through our website.</li>
                    <li>Community: Be part of a community that values and rewards your loyalty, making every meal more enjoyable.</li>
                </ul>
                <p>Join SINDHU&apos;S Loyalty Program today and start enjoying the rewards you deserve with every order!</p>
                <h5>Register and Sign In</h5>
                <p>Sign Up For Rewards in SINDHU&apos;S online ordering. If you are already a loyalty member, please login using the rewards button on SINDHU&apos;S online ordering You are all set!</p>
                <h5>How It Works</h5>
                <p><strong>Credit Accumulation:</strong> 1 credit for every $1 spent on purchasing items</p>
                <h5>Tiers:</h5>
                <ul>
                    <li>Basic: Credit Balance is greater than or equal to 0 (and more)</li>
                    <li>Silver: Credit Balance is greater than 5000 (and more)</li>
                    <li>Golds: Credit Balance is greater than 10000 (and more)</li>
                    <li>Platinum: Credit Balance is greater than 25000</li>
                </ul>
                <h5>Point Accumulation:</h5>
                <ul>
                    <li>Basic Tier: Add 1 points for every $1.00 spent</li>
                    <li>Silver Tier: Add 1.1 points for every $1.00 spent</li>
                    <li>Gold Tier: Add 1.25 points for every $1.00 spent</li>
                    <li>Platinum Tier: Add 1.5 points for every $1.00 spent</li>
                </ul>
                <br />
                <p><strong>Auto Redemption:</strong> $5 voucher for every 200 points accrued.</p>
                <p><strong>Member Anniversary</strong> (Yearly at 11AM): $10 Off any order as gift valid for 1 month</p>
                <p><strong>Joins the program:</strong>  10% off 1 order</p>
                <p><strong>Marriage Anniversary:</strong> $20 off $100 purchase</p>
                <p><strong>Birthday:</strong> Free snack (Code/Item SKU 10001) on a purchase of $10</p>
                <h4>Come, be a part of our story, and savor the true essence of South India at SINDHU&apos;S! <br /><Link href="https://online.skytab.com/0ce7fe6085d57f82615bd607fa5349a9" className={styles.btn}>Try Our Awesome Food</Link></h4>
                
            </div>
        </>
    );
}