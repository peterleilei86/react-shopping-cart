import React from 'react';
import Checkbox from '../../Checkbox';
import GithubStarButton from '../../github/StarButton';

import './style.scss';

const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];

const Filter = () => {
  return (
    <div className="filters">
      <h4 className="title">Sizes:</h4>
      {availableSizes.map(size => (
        <Checkbox classes="filters-available-size" label={size} key={size} />
      ))}
      <GithubStarButton />
    </div>
  );
};

export default Filter;
