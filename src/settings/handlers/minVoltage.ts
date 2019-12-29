import { getGlobalBoardConnectionInstance } from 'libs/board';
import { Handlers, MinVoltagle, MinVoltagleHandler } from 'settings/adapters/types';

const read = (): Promise<MinVoltagle> => {
  const board = getGlobalBoardConnectionInstance();

  return board.get('vbat_warning_cell_voltage').then(response => {
    const value = (parseInt(response) / 10).toFixed(1);

    return parseFloat(value);
  });
};

const save = (value: MinVoltagle) => {
  const board = getGlobalBoardConnectionInstance();
  const voltage = value * 10;

  board.set('vbat_warning_cell_voltage', voltage);
  board.set('vbat_min_cell_voltage', voltage - 2);
};

const handler: MinVoltagleHandler = {
  type: Handlers.MinVoltage,
  read,
  save,
};

export default handler;
