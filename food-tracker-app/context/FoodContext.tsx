import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FoodEntry {
  id: number;
  name: string;
  calories: number;
  date: string;
}

interface FoodContextType {
  entries: FoodEntry[];
  addEntry: (entry: FoodEntry) => void;
  deleteEntry: (id: number) => void;
  editEntry: (entry: FoodEntry) => void;
  clearEntries: () => void;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

interface FoodProviderProps {
  children: ReactNode;  // Define children here
}

export const FoodProvider: React.FC<FoodProviderProps> = ({ children }) => {
  const [entries, setEntries] = useState<FoodEntry[]>([]);

  useEffect(() => {
    const storedEntries = localStorage.getItem('foodEntries');
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('foodEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry: FoodEntry) => {
    setEntries(prevEntries => [...prevEntries, entry]);
  };

  const deleteEntry = (id: number) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
  };

  const editEntry = (updatedEntry: FoodEntry) => {
    setEntries(prevEntries => prevEntries.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry));
  };

  const clearEntries = () => {
    setEntries([]);
  };

  return (
    <FoodContext.Provider value={{ entries, addEntry, deleteEntry, editEntry, clearEntries }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => {
  const context = useContext(FoodContext);
  if (context === undefined) {
    throw new Error('useFood must be used within a FoodProvider');
  }
  return context;
};
