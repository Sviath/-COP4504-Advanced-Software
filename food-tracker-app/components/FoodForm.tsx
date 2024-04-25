import React, { useState, useEffect, FormEvent } from 'react';
import { useFood, FoodEntry } from '../context/FoodContext';
import styles from '../styles/Home.module.css';

interface Props {
  entry?: FoodEntry;
  onCancel: () => void;
  selectedDate: string;
}

const FoodForm: React.FC<Props> = ({ entry, onCancel, selectedDate }) => {
  const [name, setName] = useState<string>(entry?.name as string || '');
  const [calories, setCalories] = useState<number>(entry?.calories || 0);
  const [protein, setProtein] = useState<number>(entry?.protein || 0);
  const [carbs, setCarbs] = useState<number>(entry?.carbs || 0);
  const [fat, setFat] = useState<number>(entry?.fat || 0);
  const { addEntry, editEntry } = useFood() as any;  // Assuming editEntry is defined correctly now in your context
  const isEditing = !!entry;

  useEffect(() => {
    if (entry) {
      setName(entry.name as string);
      setCalories(entry.calories);
      setProtein(entry.protein);
      setCarbs(entry.carbs);
      setFat(entry.fat);
    }
  }, [entry]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const entryData = {
      id: entry?.id || Date.now(),
      name,
      calories,
      protein,
      carbs,
      fat,
      date: selectedDate,
    };

    if (isEditing && entry) {
      editEntry(entryData);
    } else {
      addEntry(entryData);
    }
    onCancel();  // Reset editing state
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Food Name" required className={styles.input} />
      <label htmlFor="calories" className={styles.label}>Calories</label>
      <input id="calories" type="number" value={calories} onChange={e => setCalories(Number(e.target.value))} placeholder="Calories Quantity" required className={styles.input} />
      <label htmlFor="protein" className={styles.label}>Protein (grams)</label>
      <input id="protein" type="number" value={protein} onChange={e => setProtein(Number(e.target.value))} placeholder="Protein Quantity" required className={styles.input} />
      <label htmlFor="carbs" className={styles.label}>Carbs (grams)</label>
      <input id="carbs" type="number" value={carbs} onChange={e => setCarbs(Number(e.target.value))} placeholder="Carbs Quantity" required className={styles.input} />
      <label htmlFor="fat" className={styles.label}>Fat (grams)</label>
      <input id="fat" type="number" value={fat} onChange={e => setFat(Number(e.target.value))} placeholder="Fat Quantity" required className={styles.input} />
      <button type="submit" className={styles.button}>{isEditing ? 'Update' : 'Add'}</button>
      {isEditing && <button type="button" onClick={onCancel} className={styles.button}>Cancel</button>}
    </form>
  );
};

export default FoodForm;
