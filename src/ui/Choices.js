import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const ButtonGroup = Button.Group;

const Choices = ({ values, selected, onSelect }) => {
  return (
    <ButtonGroup>
      {values.map(value => (
        <Button
          key={value}
          type={value === selected ? 'primary' : ''}
          onClick={() => onSelect(value)}
        >
          {value}
        </Button>
      ))}
    </ButtonGroup>
  );
};

Choices.propTypes = {
  values: PropTypes.array.isRequired,
  selected: PropTypes.any.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Choices;
