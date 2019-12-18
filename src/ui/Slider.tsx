import React, { Component } from 'react';
import { Slider, InputNumber } from 'antd';
import { SliderValue } from 'antd/lib/slider';

import { closest } from '../helpers/numbers';
import './Slider.css';

interface Props {
  selected: number;
  onSelect: (value: number) => void;
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

  onChange = (value: number | undefined) => {
    const { onSelect } = this.props;

    if (value) {
      onSelect(value);
      this.setState({
        value,
      });
    }
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
            onChange={sliderValue => this.onChange(sliderValue as number)}
            value={value as SliderValue}
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
