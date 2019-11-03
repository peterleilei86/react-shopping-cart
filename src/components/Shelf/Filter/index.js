import React from 'react';
import Checkbox from '../../Checkbox';
import GithubStarButton from '../../github/StarButton';
import './style.scss';
import { useFilters } from '../../../contexts/Filters';

const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];

const Filter = props => {
  const { updateFilters } = useFilters();
  const [selected, setSelected] = React.useState(new Set());

  const toggleCheckbox = label => {
    if (selected.has(label)) {
      selected.delete(label);
    } else {
      selected.add(label);
    }
    setSelected(selected);
    updateFilters(Array.from(selected));
  };

  const createCheckbox = label => (
    <Checkbox
      classes="filters-available-size"
      label={label}
      handleCheckboxChange={toggleCheckbox}
      key={label}
    />
  );

  const createCheckboxes = () => availableSizes.map(createCheckbox);

  return (
    <div className="filters">
      <h4 className="title">Sizes:</h4>
      {createCheckboxes()}
      <GithubStarButton />
    </div>
  );
};

export default Filter;
