import React from 'react';
import Selectbox from '../../Selectbox';
import { useSort } from '../../../contexts/Sort';

const sortBy = [
  { value: '', label: 'Select' },
  { value: 'lowestprice', label: 'Lowest to highest' },
  { value: 'highestprice', label: 'Highest to lowest' }
];

const Sort = props => {
  const { updateSort } = useSort();
  return (
    <div className="sort">
      Order by
      <Selectbox options={sortBy} handleOnChange={value => updateSort(value)} />
    </div>
  );
};

export default Sort;
