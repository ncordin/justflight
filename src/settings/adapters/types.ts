import { Handler } from 'types';

/**
 * Handler names
 */
export enum Handlers {
  ArmChannel = 'armChannel',
  Expo = 'expo',
  Filters = 'filters',
  IdleThrottle = 'idleThrottle',
  MinVoltage = 'minVoltage',
  PropsDirection = 'propsDirection',
  Rates = 'rates',
  ReceiverPort = 'receiverPort',
  ReceiverProtocol = 'receiverProtocol',
  StickAcceleration = 'stickAcceleration',
  StickTransition = 'stickTransition',
}

/**
 * Handlers value types
 */
export type ArmChannel = 'AUX 1' | 'AUX 2' | 'AUX 3';

export type Expo = number;

export enum FilteringLevel {
  Clean = 'clean',
  Default = 'default',
  Tolerent = 'tolerent',
}

export type IdleThrottle = number;

export type MinVoltagle = number;

export type PropsDirection = 'normal' | 'inverted';

export type Rates = number;

export type UartPort = 'UART 1' | 'UART 2' | 'UART 3';

export interface ReceiverPort {
  selected: UartPort;
  choices: UartPort[];
}

export type ReceiverProtocol = string;

export type StickAcceleration = number;

export type StickTransition = 'smooth' | 'medium' | 'twitchy';

/**
 * Handlers types
 */
export type ArmChannelHandler = Handler<Handlers.ArmChannel, ArmChannel>;

export type ExpoHandler = Handler<Handlers.Expo, Expo>;

export type FiltersHandler = Handler<Handlers.Filters, FilteringLevel>;

export type IdleThrottleHandler = Handler<Handlers.IdleThrottle, IdleThrottle>;

export type MinVoltagleHandler = Handler<Handlers.MinVoltage, MinVoltagle>;

export type PropsDirectionHandler = Handler<Handlers.PropsDirection, PropsDirection>;

export type RatesHandler = Handler<Handlers.Rates, Rates>;

export type ReceiverPortHandler = Handler<Handlers.ReceiverPort, ReceiverPort>;

export type ReceiverProtocolHandler = Handler<Handlers.ReceiverProtocol, ReceiverProtocol>;

export type StickAccelerationHandler = Handler<Handlers.StickAcceleration, StickAcceleration>;

export type StickTransitionHandler = Handler<Handlers.StickTransition, StickTransition>;
