import React, { useState } from 'react';
import { useFood, FoodEntry } from '../context/FoodContext';
import FoodForm from './FoodForm';
import styles from '../styles/Home.module.css';

interface FoodListProps {
  selectedDate: string;
}

const FoodList: React.FC<FoodListProps> = ({ selectedDate }) => {
  const { entries, removeEntry } = useFood();
  const [editingId, setEditingId] = useState<number | null>(null);

  const filteredEntries = entries.filter(entry => entry.date === selectedDate);

  const totals = filteredEntries.reduce((acc, entry) => {
    acc.calories += entry.calories;
    acc.protein += entry.protein;
    acc.carbs += entry.carbs;
    acc.fat += entry.fat;
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

  // Function to handle canceling the edit
  const handleCancel = () => {
    setEditingId(null);  // Reset editingId to null when cancel is triggered
  };

  return (
    <div>
      <div className={styles.totals}>
        <h2>Total Nutrients for {selectedDate}:</h2>
        <p>Calories: {totals.calories}</p>
        <p>Protein: {totals.protein}g</p>
        <p>Carbs: {totals.carbs}g</p>
        <p>Fat: {totals.fat}g</p>
      </div>
      <div style={{ width: '100%', overflowY: 'auto', maxHeight: '400px' }}>
        {filteredEntries.map(entry => (
          <div key={entry.id} className={styles.entry}>
            {editingId === entry.id ? (
              <FoodForm 
                entry={entry} 
                onCancel={handleCancel} 
                selectedDate={selectedDate} 
              />
            ) : (
              <>
                <span>{entry.name} - Calories: {entry.calories}, Protein: {entry.protein}g, Carbs: {entry.carbs}g, Fat: {entry.fat}g</span>
                <button onClick={() => setEditingId(entry.id)} className={styles.button}>Edit</button>
                <button onClick={() => removeEntry(entry.id)} className={styles.button}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodList;
