import { useEffect, useState } from 'react';
import { getNotificationSettings } from '../lib/notificationService';
import styles from '../styles/home.module.scss';

export default function NotificationBar() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loadNotification = async () => {
      try {
        const settings = await getNotificationSettings();
        setNotification(settings);
      } catch (error) {
        console.error('Failed to load notification:', error);
        setNotification({
          enabled: false,
          message: ''
        });
      }
    };
    loadNotification();
  }, []);

  if (!notification || !notification.enabled || !notification.message) {
    return null;
  }

  return (
    <div 
      className={styles.notificationBar}
      style={{
        backgroundColor: notification.backgroundColor || '#ff0000',
        color: notification.textColor || '#ffffff'
      }}
    >
      <div className={styles.notificationContent}>
        {notification.message}
      </div>
    </div>
  );
}