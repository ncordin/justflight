import { getGlobalBoardConnectionInstance } from 'libs/board';

const read = () => {
  const board = getGlobalBoardConnectionInstance();

  return board.get('vbat_warning_cell_voltage').then(response => {
    const value = (parseInt(response) / 10).toFixed(1);
    const current = parseFloat(value);

    return { current };
  });
};

const save = ({ current }) => {
  const board = getGlobalBoardConnectionInstance();
  const voltage = current * 10;

  board.set('vbat_warning_cell_voltage', voltage);
  board.set('vbat_min_cell_voltage', voltage - 2);
};

export default {
  name: 'minVoltage',
  read,
  save,
};
