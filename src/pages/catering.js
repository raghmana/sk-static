import { useEffect, useState } from 'react';
import styles from '../styles/Catering.module.scss';
import Head from 'next/head';
import { getMenuItems } from '../lib/menuService';
import Accordion from '../components/AccordionCat';

export default function Catering() {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventTime: '',
    guestCount: '',
    eventType: '',
    venue: '',
    dietaryRestrictions: '',
    additionalInfo: '',
    selectedItems: [],
  });
  useEffect(() => {
    loadData();
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

  const menuByCategory = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    if (item.isAvailable) {
      acc[item.category].push(item);
    }
    return acc;
  }, {});

//   const [selectedItems, setSelectedItems] = useState([]);

  const loadData = async () => {
    try {
      
      const [menuData] = await Promise.all([
        getMenuItems()
      ]);
      setMenuItems(menuData);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const handleCheckboxChange = (itemId) => {
    setFormData(prev => {
        const items = prev.selectedItems.includes(itemId)
          ? prev.selectedItems.filter(id => id !== itemId)
          : [...prev.selectedItems, itemId];
        return { ...prev, selectedItems: items };
    });
  };

  const breakfastItems = menuItems.filter(item => item.category === 'Breakfast');
  const AppetizersItems = menuItems.filter(item => item.category === 'Appetizers');
  const CurriesItems = menuItems.filter(item => item.category === 'Curries');
  const VegetarianItems = menuItems.filter(item => item.category === 'Vegetarian');
  const NonVegetarianItems = menuItems.filter(item => item.category === 'Non-Vegetarian');
  const RiceItems = menuItems.filter(item => item.category === 'Rice');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: '' });

    try {
      const response = await fetch('/api/catering', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: 'Thank you! Your catering request has been submitted successfully. We will contact you shortly.',
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventDate: '',
          eventTime: '',
          guestCount: '',
          eventType: '',
          venue: '',
          dietaryRestrictions: '',
          additionalInfo: '',
          selectedItems: [],
        });
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'An error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Catering Services - Sindhu&apos;s Kitchen</title>
        <meta name="description" content="Request catering services from Sindhu&apos;s Kitchen for your special events." />
      </Head>
      
      <div className={styles.cateringContainer}>
        <div className={styles.cateringHeader}>
          <h1>Catering Services</h1>
        </div>

        <div className={styles.cateringContent}>
          <div className={styles.cateringInfo}>
            <h2>Our Catering Services</h2>
            <p>
              At Sindhu&apos;s Kitchen, we offer premium catering services for all types of events, 
              from intimate gatherings to large celebrations. Our team will work with you to 
              create a customized menu that suits your taste and budget.
            </p>
            <div className={styles.cateringFeatures}>
              <div className={styles.feature}>
                <h3>Corporate Events</h3>
                <p>Impress your clients and colleagues with our professional catering services.</p>
              </div>
              <div className={styles.feature}>
                <h3>Weddings</h3>
                <p>Make your special day memorable with our delicious and authentic cuisine.</p>
              </div>
              <div className={styles.feature}>
                <h3>Private Parties</h3>
                <p>Enjoy your party while we take care of the food and service.</p>
              </div>
            </div>
          </div>

          <div className={styles.cateringForm}>
            <h2>Request Catering</h2>
            {submitStatus.message && (
              <div className={`${styles.statusMessage} ${submitStatus.success ? styles.success : styles.error}`}>
                {submitStatus.message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <h5>Select Items You&apos;re Interested In</h5>
                    {/* <p>Breakfast</p> */}
                    {Object.entries(menuByCategory).map(([category, items]) => (
                      <Accordion 
                        key={category}
                        title={category} 
                        content={
                          <div className={styles.formItems}>
                            {items.map(item => (
                              <label key={item._id} className={styles.menuItem}>
                                <input
                                  type="checkbox"
                                  name={category.toLowerCase()}
                                  checked={formData.selectedItems.includes(item.name)}
                                  onChange={() => handleCheckboxChange(item.name)}
                                  value={item.name}
                                />
                                <span>{item.name}</span>
                                <span className={styles.price}>${item.price}</span>
                              </label>
                            ))}
                          </div>
                        }
                      />
                    ))}
                    {/* <Accordion title={"Breakfast"} content={
                      <div className={styles.formItems}>
                        {breakfastItems.map(item => (
                            <label key={item.id} className={styles.menuItem}>
                                    <input
                                    type="checkbox"
                                    name="breakfast"
                                    checked={formData.selectedItems.includes(item.name)}
                                    onChange={() => handleCheckboxChange(item.name)}
                                    value={item.name}
                                    />
                                    <span>{item.name}</span>
                            </label>
                        ))}
                      </div>
                    } key={"Breakfast"} />
                     
                    <Accordion title={"Appetizers"} content={
                      <div className={styles.formItems}>
                          {AppetizersItems.map(item => (
                              <label key={item.id} className={styles.menuItem}>
                                      <input
                                      type="checkbox"
                                      name="Appetizers"
                                      checked={formData.selectedItems.includes(item.name)}
                                      onChange={() => handleCheckboxChange(item.name)}
                                      value={item.name}
                                      />
                                      <span>{item.name}</span>
                              </label>
                          ))}
                      </div>
                    } key={"Appetizers"} />
                    <Accordion title={"Curries"} content={
                      <div className={styles.formItems}>
                          {CurriesItems.map(item => (
                              <label key={item.id} className={styles.menuItem}>
                                      <input
                                      type="checkbox"
                                      name="Appetizers"
                                      checked={formData.selectedItems.includes(item.name)}
                                      onChange={() => handleCheckboxChange(item.name)}
                                      value={item.name}
                                      />
                                      <span>{item.name}</span>
                              </label>
                          ))}
                      </div>
                    } key={"Curries"} />
                    <Accordion title={"Vegetarian"} content={
                      <div className={styles.formItems}>
                          {VegetarianItems.map(item => (
                              <label key={item.id} className={styles.menuItem}>
                                      <input
                                      type="checkbox"
                                      name="Vegetarian"
                                      checked={formData.selectedItems.includes(item.name)}
                                      onChange={() => handleCheckboxChange(item.name)}
                                      value={item.name}
                                      />
                                      <span>{item.name}</span>
                              </label>
                          ))}
                      </div>
                    } key={"Vegetarian"} />
                    <Accordion title={"Non-Vegetarian"} content={
                      <div className={styles.formItems}>
                          {NonVegetarianItems.map(item => (
                              <label key={item.id} className={styles.menuItem}>
                                      <input
                                      type="checkbox"
                                      name="Non Vegetarian"
                                      checked={formData.selectedItems.includes(item.name)}
                                      onChange={() => handleCheckboxChange(item.name)}
                                      value={item.name}
                                      />
                                      <span>{item.name}</span>
                              </label>
                          ))}
                      </div>
                    } key={"Non-Vegetarian"} />
                    <Accordion title={"Rice"} content={
                      <div className={styles.formItems}>
                          {RiceItems.map(item => (
                              <label key={item.id} className={styles.menuItem}>
                                      <input
                                      type="checkbox"
                                      name="Rice"
                                      checked={formData.selectedItems.includes(item.name)}
                                      onChange={() => handleCheckboxChange(item.name)}
                                      value={item.name}
                                      />
                                      <span>{item.name}</span>
                              </label>
                          ))}
                      </div>
                    } key={"Rice"} /> */}
                </div>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="eventDate">Event Date *</label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="eventTime">Event Time *</label>
                  <input
                    type="time"
                    id="eventTime"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="guestCount">Number of Guests *</label>
                  <input
                    type="number"
                    id="guestCount"
                    name="guestCount"
                    min="1"
                    value={formData.guestCount}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="eventType">Event Type *</label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Event Type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate">Corporate Event</option>
                    <option value="Birthday">Birthday Party</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="venue">Venue Address *</label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="dietaryRestrictions">Dietary Restrictions/Preferences</label>
                <textarea
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="additionalInfo">Additional Information</label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
