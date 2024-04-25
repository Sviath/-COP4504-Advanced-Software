import React, { createContext, useContext, useState, ReactNode } from 'react';

// Export the FoodEntry interface to be accessible by other components
export interface FoodEntry {
    name: ReactNode;
    id: number;
    date: string;
    calories: number;
    protein: number;   // Ensure this is included
    carbs: number;     // Ensure this is included
    fat: number;       // Ensure this is included
}

interface FoodContextType {
    entries: FoodEntry[];
    addEntry: (entry: FoodEntry) => void;
    removeEntry: (id: number) => void;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [entries, setEntries] = useState<FoodEntry[]>([]);

    const addEntry = (entry: FoodEntry) => {
        setEntries(prevEntries => [...prevEntries, entry]);
    };

    const removeEntry = (id: number) => {
        setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
    };

    return (
        <FoodContext.Provider value={{ entries, addEntry, removeEntry }}>
            {children}
        </FoodContext.Provider>
    );
};

export const useFood = (): FoodContextType => {
    const context = useContext(FoodContext);
    if (context === undefined) {
        throw new Error('useFood must be used within a FoodProvider');
    }
    return context;
};
