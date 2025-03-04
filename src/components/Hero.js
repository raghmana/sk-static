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
                    <br />
                    <Link href="https://www.google.com" className={styles.btn}>Order Now</Link>
                </div>
                <div className={styles.right}>
                    <Image src="/asset/sh.png" alt="Sindhu's Kitchen" className={styles.heroImg} width={400} height={70} priority />
                </div>
            </div>
        </div>
    );
}