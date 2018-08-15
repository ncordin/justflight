import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Slider, InputNumber } from 'antd';

import { closest } from '../helpers/numbers';
import './Slider.css';

class IntegerStep extends Component {
  constructor() {
    super();
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

IntegerStep.propTypes = {
  selected: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  marks: PropTypes.arrayOf(PropTypes.number),
};

export default IntegerStep;
