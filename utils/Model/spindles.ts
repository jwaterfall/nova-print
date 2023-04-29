export enum SpindleState {
  unconfigured = 'unconfigured',
  stopped = 'stopped',
  forward = 'forward',
  reverse = 'reverse',
}

interface Spindle {
  active: number;
  canReverse: boolean;
  current: number;
  frequency: number;
  idlePwm: number;
  min: number;
  minPwm: number;
  max: number;
  maxPwm: number;
  state: SpindleState;
}

export default Spindle;
