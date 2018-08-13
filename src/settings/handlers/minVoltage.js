import board from '../../board';

const read = () => {
  return board.get('vbat_warning_cell_voltage').then(response => {
    const value = (response / 10).toFixed(1);

    return parseFloat(value);
  });
};

const save = value => {
  const voltage = value * 10;

  board.set('vbat_warning_cell_voltage', voltage);
  board.set('vbat_min_cell_voltage', voltage - 2);
};

export default {
  name: 'minVoltage',
  read,
  save,
};
