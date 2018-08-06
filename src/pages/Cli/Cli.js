import React, { Component, Fragment } from 'react';
import { Form, Input, Icon } from 'antd';
import Header from '../../components/Header';
import Content from '../../components/Content';

import './Cli.css';

class Cli extends Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { onSubmit } = this.props;
    const command = this.inputRef.current.input.value;

    onSubmit(command);

    event.stopPropagation();
    event.preventDefault();

    this.inputRef.current.input.value = '';

    return false;
  }

  render() {
    const { response } = this.props;

    return (
      <Fragment>
        <Header>Command Line Interpreter</Header>
        <Content className="Cli-container">
          <div className="Cli-response">{response}</div>
          <div className="Cli-input">
            <Form onSubmit={this.handleSubmit}>
              <Input
                placeholder="Type command here"
                prefix={
                  <Icon type="code" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                ref={this.inputRef}
              />
            </Form>
          </div>
        </Content>
      </Fragment>
    );
  }
}

export default Cli;
