import React from 'react';
import Selectbox from '../../Selectbox';

const sortBy = [
  { value: '', label: 'Select' },
  { value: 'lowestprice', label: 'Lowest to highest' },
  { value: 'highestprice', label: 'Highest to lowest' }
];

const Sort = () => {
  return (
    <div className="sort">
      Order by
      <Selectbox options={sortBy} />
    </div>
  );
};

export default Sort;
