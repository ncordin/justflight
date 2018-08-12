import React from 'react';
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

export default Choices;
