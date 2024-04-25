import React from 'react';

interface DatePickerProps {
  selectedDate: string;
  onChange: (newDate: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onChange }) => {
  return (
    <div>
      <input
        type="date"
        value={selectedDate}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};

export default DatePicker;
