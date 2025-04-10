export const getNotificationSettings = async () => {
  try {
    const response = await fetch('/api/notifications');
    if (!response.ok) throw new Error('Failed to fetch notification');
    return await response.json();
  } catch (error) {
    console.error('Error fetching notification:', error);
    return null;
  }
};

export const updateNotificationSettings = async (settings) => {
  try {
    const response = await fetch('/api/notifications', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    if (!response.ok) throw new Error('Failed to update notification');
    return await response.json();
  } catch (error) {
    console.error('Error updating notification:', error);
    return null;
  }
};