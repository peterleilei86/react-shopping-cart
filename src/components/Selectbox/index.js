import React from 'react';
import PropTypes from 'prop-types';
import { useShelf } from '../../services/shelf/context';

const Selectbox = ({ options }) => {
  const { updateSort } = useShelf();

  const createOptions = options =>
    options.map(o => (
      <option value={o.value} key={o.value}>
        {o.label}
      </option>
    ));

  return (
    <select onChange={e => updateSort(e.target.value)}>
      {createOptions(options)}
    </select>
  );
};

Selectbox.propTypes = {
  options: PropTypes.array.isRequired
};

export default Selectbox;
