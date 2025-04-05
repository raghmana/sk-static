import { useState, useEffect } from 'react';
import styles from '../styles/home.module.scss';
import Head from 'next/head';
import Link from 'next/link';

export default function menu() {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await fetch('/api/menu');
            const data = await response.json();
            setMenuItems(data);
        } catch (error) {
            console.error('Failed to fetch menu items:', error);
        }
    };

    const categories = [
        'Breakfast',
        'Appetizers',
        'Curries',
        'Vegetarian',
        'Non-Vegetarian',
        'Rice'
    ];

    return (
        <>
            <Head>
                <title>Our Menu - Sindhu&apos;s Kitchen</title>
                <meta name="description" content="Explore our delicious South Indian menu" />
            </Head>
            <div className={styles.menuContainer}>
                <h1>Our Menu</h1>
                {categories.map(category => (
                    <div key={category} className={styles.categorySection}>
                        <h2>{category}</h2>
                        <div className={styles.menuGrid}>
                            {menuItems
                                .filter(item => item.category === category)
                                .map(item => (
                                    <div key={item._id} className={styles.menuItem}>
                                        <h3>{item.name}</h3>
                                        {/* <p>{item.description}</p>
                                        <span className={styles.price}>${item.price}</span> */}
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