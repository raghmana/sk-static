import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { isAuthenticated, logout } from '../../lib/auth';
import { getNotificationSettings, updateNotificationSettings } from '../../lib/notificationService';
import Head from 'next/head';
import styles from '../../styles/home.module.scss';

export default function AdminDashboard() {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    isAvailable: true
  });
  const [categories, setCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    isActive: true
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    enabled: false,
    message: '',
    backgroundColor: '#ff0000',
    textColor: '#ffffff'
  });

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
    const loadNotification = async () => {
      const settings = await getNotificationSettings();
      if (settings) {
        setNotification(settings);
      }
    };
    loadNotification();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const authed = await isAuthenticated();
      if (!authed) {
        router.replace('/admin');
      } else {
        setLoading(false);
        // Fetch data only if authenticated
        fetchMenuItems();
        fetchCategories();
        const loadNotification = async () => {
          const settings = await getNotificationSettings();
          if (settings) {
            setNotification(settings);
          }
        };
        loadNotification();
      }
    };
    
    checkAuth();
  }, [router]);


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

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        setNewCategory({
          name: '',
          description: '',
          isActive: true
        });
        fetchCategories();
      }
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };

  const handleEditCategory = async (category) => {
    setEditingCategoryId(category._id);
    setNewCategory({
      name: category.name,
      description: category.description,
      isActive: category.isActive
    });
  };
  
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/categories/${editingCategoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      setEditingCategoryId(null);
      setNewCategory({
        name: '',
        description: '',
        isActive: true
      });
      fetchCategories();
    } catch (error) {
      setError('Failed to update category');
      console.error('Failed to update category:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setLoading(true);
      try {
        const response = await fetch(`/api/categories/${id}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        fetchCategories();
      } catch (error) {
        setError('Failed to delete category');
        console.error('Failed to delete category:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/menu');
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Failed to fetch menu items:', error);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!newItem.name || !newItem.price || !newItem.category) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newItem,
          price: parseFloat(newItem.price)
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setNewItem({
          name: '',
          description: '',
          price: '',
          category: '',
          isAvailable: true
        });
        fetchMenuItems();
      } else {
        setError(data.error || 'Failed to add menu item');
      }
    } catch (error) {
      console.error('Failed to add menu item:', error);
      setError('Failed to add menu item');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/menu/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        setEditingId(null);
        setNewItem({
          name: '',
          description: '',
          price: '',
          category: '',
          isAvailable: true
        });
        fetchMenuItems();
      }
    } catch (error) {
      console.error('Failed to update menu item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`/api/menu/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchMenuItems();
        }
      } catch (error) {
        console.error('Failed to delete menu item:', error);
      }
    }
  };

  const handleEditItem = (item) => {
    setEditingId(item._id);
    setNewItem({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      isAvailable: item.isAvailable
    });
  };

  const handleLogout = () => {
    logout();
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <Head>
          <title>Loading... - Admin Dashboard</title>
        </Head>
        Loading...
      </div>
    );
  }

  return (
    <div className={styles.adminDashboard}>
      <Head>
        <title>Admin Dashboard - Sindhu&apos;s Kitchen</title>
      </Head>
      <header>
        <h1>Admin Settings</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      </header>
      
      <Tabs>
        <TabList className={styles.tabList}>
          <Tab className={styles.tab}>Menu Management</Tab>
          <Tab className={styles.tab}>Notifications</Tab>
          <Tab className={styles.tab}>Categories</Tab>
        </TabList>

        <TabPanel>
          <div className={styles.menuManagement}>
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}
            <form onSubmit={editingId ? handleUpdateItem : handleAddItem}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  step="0.01"
                  value={newItem.price}
                  onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  required
                >
                  <option value="">Select a category</option>
                  {categories && categories.map((category) => (
                    <option value={category.name} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>
                  <input
                    type="checkbox"
                    id="isAvailable"
                    checked={newItem.isAvailable}
                    onChange={(e) => setNewItem({...newItem, isAvailable: e.target.checked})}
                  />
                  {' '}Item Available
                </label>
              </div>

              <button className={styles.submitButton} type="submit">
                {editingId ? 'Update Item' : 'Add Item'}
              </button>
              {editingId && (
                <button type="button" onClick={() => {
                  setEditingId(null);
                  setNewItem({
                    name: '',
                    description: '',
                    price: '',
                    category: '',
                    isAvailable: true
                  });
                }}>
                  Cancel
                </button>
              )}
            </form>

            <div className={styles.menuList}>
              <h2>Menu Items</h2>
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
                  {menuItems.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>${item.price}</td>
                      <td>{item.category}</td>
                      <td>
                        <button className={styles.editButton} onClick={() => handleEditItem(item)}>Edit</button>
                        <button className={styles.deleteButton} onClick={() => handleDeleteItem(item._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              
              <div className={styles.formGroup}>
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
              </div>
              
              <button type="submit" className={styles.saveButton}>
                Save Notification Settings
              </button>
            </form>
          </div>
        </TabPanel>

        <TabPanel>
          <div className={styles.categoryManagement}>
            <form onSubmit={editingCategoryId ? handleUpdateCategory : handleAddCategory}>
              <div className={styles.formGroup}>
                <label htmlFor="categoryName">Category Name</label>
                <input
                  type="text"
                  id="categoryName"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="categoryDescription">Description</label>
                <textarea
                  id="categoryDescription"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={newCategory.isActive}
                    onChange={(e) => setNewCategory({...newCategory, isActive: e.target.checked})}
                  />
                  Active
                </label>
              </div>

              <button className={styles.submitButton} type="submit" disabled={loading}>
                    {editingCategoryId ? 'Update Category' : 'Add Category'}
                </button>
                {editingCategoryId && (
                    <button 
                    type="button" 
                    onClick={() => {
                        setEditingCategoryId(null);
                        setNewCategory({
                        name: '',
                        description: '',
                        isActive: true
                        });
                    }}
                    disabled={loading}
                    >
                    Cancel
                    </button>
                )}
            </form>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.categoryList}>
              <h2>Categories</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category._id}>
                      <td>{category.name}</td>
                      <td>{category.description}</td>
                      <td>{category.isActive ? 'Active' : 'Inactive'}</td>
                      <td>
                        <button onClick={() => handleEditCategory(category)}>Edit</button>
                        <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}