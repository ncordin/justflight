import React, { Component, Fragment } from 'react';
import { Slider, InputNumber } from 'antd';

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
    this.setState({
      value,
    });
  };

  render() {
    const { value } = this.state;
    const { min, max, step } = this.props;

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
          <InputNumber
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default IntegerStep;
