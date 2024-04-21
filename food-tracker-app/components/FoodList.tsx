import { useFood } from '../context/FoodContext';
import FoodForm from './FoodForm';
import { useState } from 'react';

const FoodList = () => {
  const { entries, deleteEntry, clearEntries } = useFood();
  const [editingId, setEditingId] = useState<number | null>(null);

  return (
    <div>
      {entries.map(entry => (
        editingId === entry.id ? (
          <FoodForm key={entry.id} entry={entry} onCancel={() => setEditingId(null)} />
        ) : (
          <div key={entry.id}>
            <span>{entry.name} - {entry.calories} calories</span>
            <button onClick={() => setEditingId(entry.id)}>Edit</button>
            <button onClick={() => deleteEntry(entry.id)}>Delete</button>
          </div>
        )
      ))}
      <button onClick={clearEntries}>Clear All Entries</button>
    </div>
  );
};

export default FoodList;
