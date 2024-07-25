import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getItem<T>(key: string): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error getting item with key "${key}":`, error);
    return null;
  }
}

export const setItem = async (key: string, value: any): Promise<boolean> => {
  try {
    const parsedValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, parsedValue);
    return true;
  } catch (error) {
    console.error(`Error storing item with key "${key}":`, error);
    return false;
  }
};

export const removeItem = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item with key "${key}":`, error);
    return false;
  }
};
