import React, { Component, Fragment } from 'react';
import { Form, Input, Icon } from 'antd';
import Header from '../../components/Header';
import Content from '../../components/Content';

import Logo from '../../assets/cloud.svg';
import './Cli.css';

interface Props {
  onSubmit: (string) => void;
  response: string;
}

class Cli extends Component<Props> {
  inputRef: any;

  constructor(props: Props) {
    super(props);
    this.inputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.inputRef.current.input.focus();
  }

  handleSubmit(event) {
    const { onSubmit } = this.props;
    const command: string = this.inputRef.current.input.value;

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
          <div className="Cli-response">
            <div className="Cli-response-picture">
              <img src={Logo} alt="Cloud" style={{ height: 350 }} />
            </div>
            <div className="Cli-response-text">{response}</div>
          </div>
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
