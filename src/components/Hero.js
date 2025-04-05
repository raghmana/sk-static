import SplitText from "./Anim";
import styles from '../styles/home.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

export default function Hero() {
    return (
        <div className={styles.hero}>
            <div className={styles.heroContainer}>
                <div className={styles.left}>
                    <SplitText
                        text="Authentic South Indian Taste, Crafted with Premium Spices & Ingredients"
                        className={styles.heroTitle}
                        delay={30}
                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                        easing="easeOutCubic"
                        threshold={0.5}
                        rootMargin="-50px"
                        onLetterAnimationComplete={handleAnimationComplete}
                    />
                    <p>39 years of serving our classics. From traditional delicacies to highest quality South Indian specials, we at Sindhu&apos;s always believed in serving quality food at affordable prices.</p>
                    <br />
                    <Link href="https://online.skytab.com/0ce7fe6085d57f82615bd607fa5349a9" className={styles.btn}>Order Now</Link>
                    <Image src="/asset/hero/banner-1.png" alt="Sindhu's Kitchen" className={styles.bannerShapes1} width={400} height={170} priority />
                </div>
                <div className={styles.right}>
                    <div className={styles.one}>
                        <div className={styles.shape1}></div>
                    </div>
                    <div className={styles.two}>
                        <div className={styles.shape1}>
                            <Image src="/asset/hero/banner-2.png" alt="Sindhu's Kitchen" className={styles.bannerShapes2} width={400} height={170} priority />
                        </div>
                    </div>
                    {/* <div className={styles.three}></div> */}
                    {/* <Image src="/asset/galary/hero.png" alt="Sindhu's Kitchen" className={styles.heroImg} width={400} height={170} priority /> */}
                </div>
            </div>
        </div>
    );
}