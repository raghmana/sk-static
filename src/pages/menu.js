import { useState, useEffect } from 'react';
import styles from '../styles/home.module.scss';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function MenuPage() {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchMenuItems();
        fetchCategories();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await fetch('/api/menu');
            const data = await response.json();
            // Filter items where forMenu is true
            const menuOnlyItems = data.filter(item => item.forMenu && item.isAvailable);
            setMenuItems(menuOnlyItems);
        } catch (error) {
            console.error('Failed to fetch menu items:', error);
        }
    };

    const fetchCategories = async () => {
        try {
          const response = await fetch('/api/categories');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setCategories(data || []);
        } catch (error) {
          console.error('Failed to fetch categories:', error);
          setCategories([]);
        }
    };

    // const categories = [
    //     'Breakfast',
    //     'Appetizers',
    //     'Curries',
    //     'Vegetarian',
    //     'Non-Vegetarian',
    //     'Rice'
    // ];

    return (
        <>
            <Head>
                <title>Menu - Sindhu&apos;s Kitchen</title>
                <meta name="description" content="Request catering services from Sindhu&apos;s Kitchen for your special events." />
                <link rel="icon" type="image/x-icon" href="/asset/logo-round.png"></link>
            </Head>
            <div className={styles.menuContainer}>
                <h1>Our Menu</h1>
                <h2>Popular Dishes</h2>
                <div className={styles.topMenu}>
                    <div className={styles.card}>
                        <Image src="/asset/banner/13.jpg" alt="Sindhu's Kitchen" className={styles.bannerShapes1} width={400} height={170} priority />
                        <h5>Mutton Biryani</h5>
                        <p className={styles.price}>$15.99</p>
                        <p className={styles.des}>SINDHU&apos;S Special Mutton Biryani</p>
                        <label>&#x1F496;5</label>
                        <Link className={styles.link} href="https://online.skytab.com/0ce7fe6085d57f82615bd607fa5349a9/ea47e53e-d092-4d3f-a3c8-c2e5aa3414a6" target="_blank">Order Now</Link>
                    </div>
                    <div className={styles.card}>
                        <Image src="/asset/banner/14.jpg" alt="Sindhu's Kitchen" className={styles.bannerShapes1} width={400} height={170} priority />
                        <h5>Veg Kothu Parota</h5>
                        <p className={styles.price}>$12.99</p>
                        <p className={styles.des}>Veg Kothu Parota</p>
                        <label>&#x1F496;5</label>
                        <Link className={styles.link} href="https://online.skytab.com/0ce7fe6085d57f82615bd607fa5349a9/ea47e53e-d092-4d3f-a3c8-c2e5aa3414a6" target="_blank">Order Now</Link>
                    </div>
                    <div className={styles.card}>
                        <Image src="/asset/banner/10.jpg" alt="Sindhu's Kitchen" className={styles.bannerShapes1} width={400} height={170} priority />
                        <h5>Filter Coffee</h5>
                        <p className={styles.price}>$3.49</p>
                        <p className={styles.des}>Spl Filter Coffee</p>
                        <label>&#x1F496;5</label>
                        <Link className={styles.link} href="https://online.skytab.com/0ce7fe6085d57f82615bd607fa5349a9/ea47e53e-d092-4d3f-a3c8-c2e5aa3414a6" target="_blank">Order Now</Link>
                    </div>
                    <div className={styles.card}>
                        <Image src="/asset/banner/11.jpg" alt="Sindhu's Kitchen" className={styles.bannerShapes1} width={400} height={170} priority />
                        <h5>Fish Curry</h5>
                        <p className={styles.price}>$12.99</p>
                        <p className={styles.des}>Fish Curry - 16Oz</p>
                        <label>&#x1F496;5</label>
                        <Link className={styles.link} href="https://online.skytab.com/0ce7fe6085d57f82615bd607fa5349a9/ea47e53e-d092-4d3f-a3c8-c2e5aa3414a6" target="_blank">Order Now</Link>
                    </div>
                </div>
                <br />
                <br />
                {categories.map(category => (
                    <div key={category} className={styles.categorySection}>
                        <h2>{category.name}</h2>
                        <div className={styles.menuGrid}>
                            {menuItems
                                .filter(item => item.category === category.name)
                                .map(item => (
                                    <div key={item._id} className={styles.menuItem}>
                                        <h3>{item.name}</h3>
                                        <p>{item.description}</p>
                                        {/* <span className={styles.price}>${item.price}</span> */}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}