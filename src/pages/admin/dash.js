import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated, logout } from '../../lib/auth';
import { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } from '../../lib/menuService';
import { getNotificationSettings, updateNotificationSettings } from '../../lib/notificationService';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Head from 'next/head';
import withAdminAuth from '../../components/withAdminAuth';
import styles from '../../styles/home.module.scss';


function AdminDashboard() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [notification, setNotification] = useState({
    enabled: false,
    message: '',
    backgroundColor: '#ff0000',
    textColor: '#ffffff'
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin');
    } else {
      setAuthChecked(true);
      loadData();
    }

    // const checkAuth = async () => {
    //     const authenticated = isAuthenticated();
        
    //     if (!authenticated) {
    //       router.push('/admin');
    //     } else {
    //       setAuthChecked(true);
    //     }
    // };
  }, [router]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [menuData, notificationData] = await Promise.all([
        getMenuItems(),
        getNotificationSettings()
      ]);
      setMenuItems(menuData);
      setNotification(notificationData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };


const loadMenuItems = async () => {
    setIsLoading(true);
    try {
      const items = await getMenuItems();
      setMenuItems(items);
    } catch (error) {
      console.error('Failed to load menu items:', error);
      // Optionally show error to user
      setError('Failed to load menu items. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;
    
    const addedItem = await addMenuItem(newItem);
    setMenuItems([...menuItems, addedItem]);
    setNewItem({
      name: '',
      description: '',
      price: '',
      category: ''
    });
  };

  const handleEditItem = (item) => {
    setEditingId(item.id);
    setNewItem({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category
    });
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;
    
    const updatedItem = await updateMenuItem(editingId, newItem);
    if (updatedItem) {
      setMenuItems(menuItems.map(item => 
        item.id === editingId ? updatedItem : item
      ));
      setEditingId(null);
      setNewItem({
        name: '',
        description: '',
        price: '',
        category: ''
      });
    }
  };

  const handleDeleteItem = async (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await deleteMenuItem(id);
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/admin');
  };

  const handleNotificationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNotification(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const saveNotificationSettings = async (e) => {
    e.preventDefault();
    try {
      await updateNotificationSettings(notification);
      alert('Notification settings saved!');
    } catch (error) {
      console.error('Failed to save notification:', error);
      alert('Failed to save notification settings');
    }
  };

  if (!authChecked || isLoading) {
    return (
      <div className="admin-dashboard loading">
        <p>Loading...</p>
      </div>
    );
  }

  const customTheme = {
    TabActive: {
      backgroundColor: '#fff',
      borderBottom: '2px solid #337ab7',
      padding: '10px',
    },
  };
  
  
  // useEffect(() => {
  //   const loadNotification = async () => {
  //     try {
  //       const settings = await getNotificationSettings();
  //       setNotification(settings);
  //     } catch (error) {
  //       console.error('Failed to load notification settings:', error);
  //     }
  //   };
  //   loadNotification();
  // }, []);
  
  // const handleNotificationChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setNotification(prev => ({
  //     ...prev,
  //     [name]: type === 'checkbox' ? checked : value
  //   }));
  // };
  
  // const saveNotificationSettings = async (e) => {
  //   e.preventDefault();
  //   await updateNotificationSettings(notification);
  //   alert('Notification settings saved!');
  // };

  return (
    <div className={styles.adminDashboard}>
      <Head>
        <title>Admin Dashboard Sindhus Kitchen</title>
      </Head>
      <header>
        <h1>Admin Settings</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      </header>

      <Tabs className={styles.tabs} theme={customTheme}>
        <TabList className={styles.tabList}>
          <Tab className={styles.tab}>Menu</Tab>
          <Tab className={styles.tab}>Notification</Tab>
        </TabList>
        <TabPanel>
          <div className={styles.wrapper}>
            <div className={styles.menuForm}>
              <h2>{editingId ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
              <form onSubmit={editingId ? handleUpdateItem : handleAddItem}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newItem.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={newItem.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="price">Price</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={newItem.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={newItem.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Appetizers">Appetizers</option>
                    <option value="Curries">Curries</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Rice">Rice</option>
                  </select>
                </div>
                <button type="submit" className={styles.submitButton}>
                  {editingId ? 'Update Item' : 'Add Item'}
                </button>
                {editingId && (
                  <button 
                    type="button" 
                    className={styles.cancelButton}
                    onClick={() => {
                      setEditingId(null);
                      setNewItem({
                        name: '',
                        description: '',
                        price: '',
                        category: ''
                      });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>
            
            <div className={styles.menuList}>
              <h2>Current Menu Items</h2>
              {menuItems.length === 0 ? (
                <p>No menu items yet. Add some above.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>${item.price}</td>
                        <td>{item.category}</td>
                        <td className={styles.actions}>
                          <button 
                            onClick={() => handleEditItem(item)}
                            className={styles.editButton}
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteItem(item.id)}
                            className={styles.deleteButton}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={styles.notificationSettings}>
            <h2>Notification Bar Settings</h2>
            <form onSubmit={saveNotificationSettings}>
              <div className={styles.formGroup}>
                <label>
                  <input
                    type="checkbox"
                    name="enabled"
                    checked={notification.enabled}
                    onChange={handleNotificationChange}
                  />
                  Enable Notification Bar
                </label>
              </div>
              
              <div className={styles.formGroup}>
                <label>Message</label>
                <textarea
                  name="message"
                  value={notification.message}
                  onChange={handleNotificationChange}
                  rows="3"
                />
              </div>
              
              {/* <div className={styles.formGroup}>
                <label>Background Color</label>
                <input
                  type="color"
                  name="backgroundColor"
                  value={notification.backgroundColor}
                  onChange={handleNotificationChange}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Text Color</label>
                <input
                  type="color"
                  name="textColor"
                  value={notification.textColor}
                  onChange={handleNotificationChange}
                />
              </div> */}
              
              <button type="submit" className={styles.saveButton}>
                Save Notification Settings
              </button>
            </form>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default withAdminAuth(AdminDashboard);