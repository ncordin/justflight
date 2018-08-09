import React, { Fragment } from 'react';
import { Tag } from 'antd';

import Centered from '../../ui/Centered';
import Content from '../../components/Content';

import './Board.css';

const Board = ({ details }) => {
  const colors = ['#f50', '#2db7f5', '#87d068', '#108ee9', '#fdb92c', '#aaa'];

  return (
    <Fragment>
      <Content>
        <Centered>
          <h1>{details.brand}</h1>
          <div className="Board-picture">{details.family}</div>
          <div className="Board-details">
            {details &&
              Object.values(details)
                .filter(detail => detail)
                .map((detail, index) => {
                  return (
                    <Tag key={index} color={colors[index % colors.length]}>
                      {detail}
                    </Tag>
                  );
                })}
          </div>
        </Centered>
      </Content>
    </Fragment>
  );
};

export default Board;
