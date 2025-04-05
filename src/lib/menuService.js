export const getMenuItems = async () => {
    try {
      const response = await fetch('/api/menu');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch menu items:', error);
      return [];
    }
  };
  
  export const addMenuItem = async (item) => {
    const response = await fetch('/api/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    return await response.json();
  };
  
  export const updateMenuItem = async (id, updatedItem) => {
    const response = await fetch('/api/menu', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...updatedItem }),
    });
    return await response.json();
  };
  
  export const deleteMenuItem = async (id) => {
    await fetch(`/api/menu?id=${id}`, {
      method: 'DELETE',
    });
    return id;
  };