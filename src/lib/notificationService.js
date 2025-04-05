export const getNotificationSettings = async () => {
    try {
      const response = await fetch('/api/notification');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch notification settings:', error);
      return {
        enabled: false,
        message: '',
        backgroundColor: '#ff0000',
        textColor: '#ffffff'
      };
    }
  };
  
  export const updateNotificationSettings = async (settings) => {
    const response = await fetch('/api/notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    return await response.json();
  };