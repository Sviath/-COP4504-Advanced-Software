import { useState, FormEvent } from 'react';
import { useFood } from '../context/FoodContext';

interface Props {
  entry?: { id: number; name: string; calories: number; date: string };
  onCancel?: () => void;
}

const FoodForm: React.FC<Props> = ({ entry, onCancel }) => {
  const [name, setName] = useState(entry?.name || '');
  const [calories, setCalories] = useState(entry?.calories || 0);
  const { addEntry, editEntry } = useFood();
  const isEditing = !!entry;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const entryData = {
      id: entry?.id || Date.now(),
      name,
      calories,
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    };

    if (isEditing) {
      editEntry(entryData);
    } else {
      addEntry(entryData);
    }
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Food name"
        required
      />
      <input
        type="number"
        value={calories}
        onChange={(e) => setCalories(Number(e.target.value))}
        placeholder="Calories"
        required
      />
      <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
      {isEditing && <button onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default FoodForm;
