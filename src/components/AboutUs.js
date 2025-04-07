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
          <Image src="/asset/banner/13.jpg" alt="Sindhus Kitchen" className={styles.bannerImg} width={300} height={150} priority />
          <Image src="/asset/banner/14.jpg" alt="Sindhus Kitchen" className={styles.bannerImg} width={300} height={150} priority />
          <Image src="/asset/banner/10.jpg" alt="Sindhus Kitchen" className={styles.bannerImg} width={300} height={150} priority />
          <Image src="/asset/banner/4.jpg" alt="Sindhus Kitchen" className={styles.bannerImg} width={300} height={150} priority />
          <Image src="/asset/banner/12.jpg" alt="Sindhus Kitchen" className={styles.bannerImg} width={300} height={150} priority />
          <Image src="/asset/banner/11.jpg" alt="Sindhus Kitchen" className={styles.bannerImg} width={300} height={150} priority />
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
      {/* <section className={styles.about}>
        <h2>Best Indian food in Little Elm</h2>
        <div className={styles.aboutInner}>
          <div className={styles.left}>
            <Image src="/asset/banner/about.png" alt="Sindhus Kitchen" className={styles.aboutImg} width={300} height={150} priority />
          </div>
          <div className={styles.right}>
            <h3>Welcome to SINDHU&apos;S</h3>
            <p>At SINDHU&apos;S, we&apos;re all about bringing the rich and authentic flavors of South Indian Tamil cuisine to your table. Located at 2700 East Eldorado Parkway Suite 203, Little Elm, TX 75068, our food is made just like it is at home, with fresh and healthy ingredients. We use traditional cooking methods to keep all the natural goodness in every dish. <br />We prepare our food with the same care and attention as we would for our own family, valuing every ingredient that contributes to the excellence of our dishes.</p>
            <Link href="https://online.skytab.com/0ce7fe6085d57f82615bd607fa5349a9" className={styles.btn}>Try Our Awesome Food</Link>
          </div>
        </div>
      </section> */}
      <section className={styles.special}>
        {/* <h2>Why Sindhu&apos;s</h2> */}
        <Image src="/asset/hero/kolam-mini.png" alt="Sindhu's Kitchen" className={styles.bannerShapes1} width={400} height={170} priority />
        <h3>What makes Sindhu&apos;s special</h3>
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
      {/* <section className={styles.galary}>
        <h2>SINDHU&apos;S Gallery</h2>
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
          <div className={styles.card13}></div>
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
          <div className={styles.card25}></div>
        </div>
      </section> */}
      <section className={styles.rewards}>
        <div className={styles.inner}>
          <h2>Sindhu&apos;s rewards</h2>
          <p>Become a member of our exclusive rewards program and start earning points every time you shop! Redeem your points for exciting free items, enjoy special perks, and be the first to know about our latest offers, updates, and events.</p>
          <Link href="https://online.skytab.com/0ce7fe6085d57f82615bd607fa5349a9/account/entry?signUpTab=true" target="_blank" className={styles.cta}>Get Your Reward Points</Link>
          <Image src="/asset/galary/reward-min.png" alt="Sindhu's Kitchen" className={styles.bannerShapes1} width={400} height={170} priority />
        </div>
      </section>
      <section className={styles.testimonials}>
        <h2>What Our Customers Says</h2>
        <Marquee className={styles.marquee} pauseOnHover={true} gradient={false} speed={60}>
          <div className={styles.inner}>
            <div className={styles.card}>
              <div className={styles.extra}>”</div>
              <Image src="/asset/icon/nikul.webp" alt="Sindhus Kitchen" className={styles.aboutImg} width={60} height={60} priority />
              <h4>Nikul S.</h4>
              <p>I discovered this place yesterday on DD. I ordered the Rasaam and Sambar. Incredible. First time I had either of these items where it was comparable to home cooking. Not just the taste, but the freshness and quality of the preparation. I was so impressed I decided to put in a much larger order today and will enjoy with my family tonight for dinner. Although I have not tried today&apos;s order, the quality and care of packaging was evident they take tremendous pride and care in their product. The food definitely surpasses any eye test! Will update the post after we eat tonight.</p>
            </div>
          </div>
          <div className={styles.inner}>
            <div className={styles.card}>
              <div className={styles.extra}>”</div>
              <Image src="/asset/icon/rajesh.webp" alt="Sindhus Kitchen" className={styles.aboutImg} width={60} height={60} priority />
              <h4>Rajeshkanna T.</h4>
              <p>Awesome food! The Veg Biryani we ordered was absolutely delightful! It had such an authentic taste that truly impressed us. Typically, we lean towards non-veg Biryani, but this one has definitely changed our minds—it's easily one of the best we've ever had. We're eager to explore more of Sindhu's menu. It's quickly becoming our favorite spot.</p>
            </div>
          </div>
          <div className={styles.inner}>
          <div className={styles.card}>
            <div className={styles.extra}>”</div>
              <Image src="/asset/icon/deva.webp" alt="Sindhus Kitchen" className={styles.aboutImg} width={60} height={60} priority />
              <h4>Deva M.</h4>
              <p>Sindhu’s Kitchen serves tasty and fresh food every time. The flavors always hit the mark, and it really feels like homemade cooking. What I love most is that the quality and taste are always spot on, no matter when I order. The ingredients always seem fresh, and the dishes are prepared with care. Whether I eat there or get takeout, I know I can count on Sindhu’s Kitchen for a delicious and reliable meal. This place is definitely a go-to for great food.</p>
            </div>
          </div>
        </Marquee>
        
      </section>
      <section className={styles.faq}>
      <h2>Faq</h2>
      {accordionData.map(({ title, content }) => (
          <Accordion title={title} content={content} key={title} />
        ))}
      </section>
    </>
  );
}