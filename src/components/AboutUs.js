import React, { useEffect, useState } from "react";
import styles from '../styles/home.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Marquee from "react-fast-marquee";
import Accordion from './Accordion';
import { accordionData } from '../data/content';

export default function AboutUs() {
  return (
    <>
      <section className={styles.how}>
        <h2>Sindhu&apos;s Special</h2>
        <Marquee className={styles.marquee} pauseOnHover={true} gradient={false} speed={60}>
          <Image src="/asset/banner/1.jpg" alt="Sindhus Kitchen" className={styles.bannerImg} width={300} height={150} priority />
          <Image src="/asset/banner/8.jpg" alt="Sindhus Kitchen" className={styles.bannerImg} width={300} height={150} priority />
          <Image src="/asset/banner/3.jpg" alt="Sindhus Kitchen" className={styles.bannerImg} width={300} height={150} priority />
          <Image src="/asset/banner/4.jpg" alt="Sindhus Kitchen" className={styles.bannerImg} width={300} height={150} priority />
          <Image src="/asset/banner/5.jpg" alt="Sindhus Kitchen" className={styles.bannerImg} width={300} height={150} priority />
          <Image src="/asset/banner/6.jpg" alt="Sindhus Kitchen" className={styles.bannerImg} width={300} height={150} priority />
        </Marquee>
        <Marquee className={styles.marquee} pauseOnHover={true} gradient={false} speed={60} direction={"right"}>
          <h3>Chicken Biryani - </h3>
          <h3>Mutton Biryani - </h3>
          <h3>Veg Kothu Parota - </h3>
          <h3>Fish Curry - </h3>
          <h3>CKN Pallipalayam - </h3>
          <h3>Chicken Meal - </h3>
          <h3>Kizhi Parotta - </h3>
        </Marquee>
      </section>
      <section className={styles.about}>
        <h2>Best Indian food in Little Elm</h2>
        <div className={styles.aboutInner}>
          <div className={styles.left}>
            <Image src="/asset/banner/about.png" alt="Sindhus Kitchen" className={styles.aboutImg} width={300} height={150} priority />
          </div>
          <div className={styles.right}>
            <h3>Welcome to SINDHU&apos;s</h3>
            <p>At SINDHU&apos;S, we&apos;re all about bringing the rich and authentic flavors of South Indian Tamil cuisine to your table. Located at 2700 East Eldorado Parkway Suite 203, Little Elm, TX 75068, our food is made just like it is at home, with fresh and healthy ingredients. We use traditional cooking methods to keep all the natural goodness in every dish. <br />We prepare our food with the same care and attention as we would for our own family, valuing every ingredient that contributes to the excellence of our dishes.</p>
            <Link href="https://online.skytab.com/0ce7fe6085d57f82615bd607fa5349a9" className={styles.btn}>Try Our Awesome Food</Link>
          </div>
        </div>
      </section>
      <section className={styles.special}>
        {/* <h2>Why Sindhu&apos;s</h2> */}
        <Image src="/asset/hero/banner-1.png" alt="Sindhu's Kitchen" className={styles.bannerShapes1} width={400} height={170} priority />
        <h3>What makes SINDHU&apos;s special</h3>
        <div className={styles.box}>
          <div className={styles.boxList}>
            <Image src="/asset/icon/water.png" alt="Sindhus Kitchen" className={styles.aboutImg} width={60} height={60} priority />
            <h4>Pure Beginnings</h4>
            <p>Our culinary creations start with the purest water in all our food and snack preparation.</p>
          </div>
          <div className={styles.boxList}>
            <Image src="/asset/icon/oil.png" alt="Sindhus Kitchen" className={styles.aboutImg} width={60} height={60} priority />
            <h4>Premium Oils</h4>
            <p>Exclusively cold-pressed Sesame and Peanut oils enhance our dishes.</p>
          </div>
          <div className={styles.boxList}>
            <Image src="/asset/icon/care.png" alt="Sindhus Kitchen" className={styles.aboutImg} width={60} height={60} priority />
            <h4>Sourced with Care</h4>
            <p>We curate our dishes with premium ingredients, some specially sourced from the heart of Tamil Nadu, India.</p>
          </div>
        </div>
        <div className={styles.box1}>
          <div className={styles.boxList}>
            <Image src="/asset/icon/fresh.png" alt="Sindhus Kitchen" className={styles.aboutImg} width={60} height={60} priority />
            <h4>Unmatched Freshness</h4>
            <p>Enjoy meals prepared on the very same day, using our own freshly made masalas and freshly cut vegetables.</p>
          </div>
          <div className={styles.boxList}>
            <Image src="/asset/icon/quality.png" alt="Sindhus Kitchen" className={styles.aboutImg} width={60} height={60} priority />
            <h4>Quality Assurance</h4>
            <p>Rest assured, we never recycle our cooking oil, maintaining the highest quality standards.</p>
          </div>
          <div className={styles.boxList}>
            <Image src="/asset/icon/tradition.png" alt="Sindhus Kitchen" className={styles.aboutImg} width={60} height={60} priority />
            <h4>Honored Traditions</h4>
            <p>Our commitment to traditional cooking techniques not only preserves nutrients but also enhances flavors.</p>
          </div>
        </div>
        <div className={styles.box2}>
          <div className={styles.boxListTwo}>
            <h4>Fresh, Healthy, and Irresistible</h4>
            <p>At SINDHU&apos;s, we make everything from scratch using the freshest ingredients, so you get all the natural goodness in every bite. Our menu is full of tasty and spicy snacks that you just can&apos;t resist. Whether you&apos;re craving crispy bites or savory treats, we&apos;ve got you covered. Come enjoy a taste of India and treat yourself to snacks that hit the spot!</p>
          </div>
        </div>
      </section>
      <section className={styles.galary}>
        <h2>SINDHU&apos;s Gallery</h2>
        <div className={styles.bento}>
          <div className={styles.card1}></div>
          <div className={styles.card2}></div>
          <div className={styles.card3}></div>
          <div className={styles.card4}></div>
          <div className={styles.card5}></div>
          <div className={styles.card6}></div>
          <div className={styles.card7}></div>
          <div className={styles.card8}></div>
          <div className={styles.card9}></div>
          <div className={styles.card10}></div>
          <div className={styles.card11}></div>
          <div className={styles.card12}></div>
          {/* <div className={styles.card13}></div>
          <div className={styles.card14}></div>
          <div className={styles.card15}></div>
          <div className={styles.card16}></div>
          <div className={styles.card17}></div>
          <div className={styles.card18}></div>
          <div className={styles.card19}></div>
          <div className={styles.card20}></div>
          <div className={styles.card21}></div>
          <div className={styles.card22}></div>
          <div className={styles.card23}></div>
          <div className={styles.card24}></div>
          <div className={styles.card25}></div> */}
        </div>
      </section>
      <section className={styles.testimonials}>
        <h2>What Our Customers Says</h2>
        <div className={styles.inner}>
          <div className={styles.card}>
            <div className={styles.extra}>”</div>
            <Image src="/asset/man.png" alt="Sindhus Kitchen" className={styles.aboutImg} width={60} height={60} priority />
            <h4>Nikul S.</h4>
            <p>I discovered this place yesterday on DD. I ordered the Rasaam and Sambar. Incredible. First time I had either of these items where it was comparable to home cooking. Not just the taste, but the freshness and quality of the preparation. I was so impressed I decided to put in a much larger order today and will enjoy with my family tonight for dinner. Although I have not tried today&apos;s order, the quality and care of packaging was evident they take tremendous pride and care in their product. The food definitely surpasses any eye test! Will update the post after we eat tonight.</p>
          </div>
        </div>
      </section>
      <section className={styles.faq}>
      <h2>FAQ</h2>
      {accordionData.map(({ title, content }) => (
          <Accordion title={title} content={content} key={title} />
        ))}
      </section>
    </>
  );
}