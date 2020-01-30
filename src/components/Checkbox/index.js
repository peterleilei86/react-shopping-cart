import React, { useState } from 'react';
import { useFilter } from '../../services/filters/context';

const Checkbox = ({ label, classes }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { updateFilters } = useFilter();

  const toggleCheckboxChange = () => {
    setIsChecked(state => !state);
    updateFilters(label);
  };

  return (
    <div className={classes}>
      <label>
        <input
          type="checkbox"
          value={label}
          checked={isChecked}
          onChange={toggleCheckboxChange}
        />
        <span className="checkmark">{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
