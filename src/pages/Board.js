import React, { Fragment } from 'react';
import Centered from '../ui/Centered';
import Header from '../components/Header';
import Content from '../components/Content';

const Board = () => {
  return (
    <Fragment>
      <Header>Board</Header>
      <Content>
        <Centered>In progress...</Centered>
      </Content>
    </Fragment>
  );
};

export default Board;
