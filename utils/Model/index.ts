import Board from './boards';
import Directories from './directories';
import Fan from './fans';
import Heat from './heat';
import HttpEndpoint from './httpEndpoints';
import InputChannel from './inputChannel';
import Job from './job';
import Limits from './limits';
import Move from './move';
import Network from './network';
import Sensors from './sensors';
import Spindle from './spindles';
import State from './state';
import Tool from './tools';
import UserSession from './userSessions';
import Volume from './volumes';

export type ModelKey =
  | 'boards'
  | 'directories'
  | 'fans'
  | 'heat'
  | 'httpEndpoints'
  | 'inputChannels'
  | 'job'
  | 'limits'
  | 'move'
  | 'network'
  | 'sensors'
  | 'spindles'
  | 'state'
  | 'tools'
  | 'userSessions'
  | 'volumes';

export type ModelValue<T> = T extends 'boards'
  ? Board[]
  : T extends 'directories'
  ? Directories
  : T extends 'fans'
  ? Fan[]
  : T extends 'heat'
  ? Heat
  : T extends 'httpEndpoints'
  ? HttpEndpoint[]
  : T extends 'inputChannels'
  ? InputChannel[]
  : T extends 'job'
  ? Job
  : T extends 'limits'
  ? Limits
  : T extends 'move'
  ? Move
  : T extends 'network'
  ? Network
  : T extends 'sensors'
  ? Sensors
  : T extends 'spindles'
  ? Spindle[]
  : T extends 'state'
  ? State
  : T extends 'tools'
  ? Tool[]
  : T extends 'userSessions'
  ? UserSession[]
  : T extends 'volumes'
  ? Volume[]
  : never;