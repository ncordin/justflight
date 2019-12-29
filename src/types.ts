import {
  Expo,
  ArmChannel,
  FilteringLevel,
  IdleThrottle,
  MinVoltagle,
  PropsDirection,
  Rates,
  UartPort,
  ReceiverPort,
  ReceiverProtocol,
  StickAcceleration,
  StickTransition,
} from 'settings/adapters/types';

export interface Handler<T, V> {
  type: T;
  read: () => Promise<V>;
  save: (value: V, settings: BoardSettings) => void;
}

export interface BoardSettings {
  armChannel: ArmChannel;
  expo: Expo;
  filters: FilteringLevel;
  idleThrottle: IdleThrottle;
  minVoltagle: MinVoltagle;
  propsDirection: PropsDirection;
  rates: Rates;
  uartPort: UartPort;
  receiverPort: ReceiverPort;
  receiverProtocol: ReceiverProtocol;
  stickAcceleration: StickAcceleration;
  stickTransition: StickTransition;
}
