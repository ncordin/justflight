import React, { Fragment } from 'react';
import { Tag } from 'antd';

import Centered from '../../ui/Centered';
import Content from '../../components/Content';

import './Board.css';

interface Props {
  details: any;
}

const Board = ({ details }: Props) => {
  const colors = [
    '#f50',
    '#2db7f5',
    '#87d068',
    '#108ee9',
    '#fdb92c',
    '#aaa',
    '#eb2f96',
    '#722ed1',
  ];

  return (
    <Fragment>
      <Content>
        <Centered>
          <h1>{details.brand}</h1>
          <div className="Board-picture">{details.family}</div>
          <div className="Board-details">
            {details &&
              Object.entries(details)
                .filter(([, value]) => value)
                .filter(([name]) => name !== 'brand')
                .map(([, value], index) => {
                  return (
                    <Tag key={index} color={colors[index % colors.length]}>
                      {value}
                    </Tag>
                  );
                })}
          </div>
          <p>
            <br />
            <br />
            Ready to fly!
          </p>
        </Centered>
      </Content>
    </Fragment>
  );
};

export default Board;

/*
TODO:
Notifications : saved / usb error / aux 3 is moving
Loader : rebooting
Warning 4 diffs [Show][Reset]
JustFlight approved
*/
