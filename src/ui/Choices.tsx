import React from 'react';
import { Button } from 'antd';

const ButtonGroup = Button.Group;

interface Props {
  values: string[];
  selected: string;
  onSelect: (string) => void;
}

const Choices = ({ values, selected, onSelect }: Props) => {
  return (
    <ButtonGroup>
      {values.map(value => (
        <Button
          key={value}
          type={value === selected ? 'primary' : 'default'}
          onClick={() => onSelect(value)}
        >
          {value}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default Choices;
