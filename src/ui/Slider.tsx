import React, { Component } from 'react';
import { Slider, InputNumber } from 'antd';

import { closest } from '../helpers/numbers';
import './Slider.css';

interface Props {
  selected: number;
  onSelect: (number) => void;
  min: number;
  max: number;
  step?: number;
  marks?: number[];
}

interface State {
  value: number;
}

class IntegerStep extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  componentDidMount() {
    const { selected } = this.props;

    this.setState({ value: selected });
  }

  onChange = value => {
    const { onSelect } = this.props;

    onSelect(value);
    this.setState({
      value,
    });
  };

  render() {
    const { value } = this.state;
    const { min, max, step, marks } = this.props;

    return (
      <div className="Slider-row">
        <div className="Slider-bar">
          <Slider
            min={min}
            max={max}
            step={step}
            onChange={this.onChange}
            value={value}
          />
        </div>
        <div className="Slider-input">
          {!marks && (
            <InputNumber
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={this.onChange}
            />
          )}
          {marks && closest(marks, value)}
        </div>
      </div>
    );
  }
}

export default IntegerStep;