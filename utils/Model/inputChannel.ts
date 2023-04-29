export enum Compatibility {
  Default = "Default",
  RepRapFirmware = "RepRapFirmware",
  Marlin = "Marlin",
  Teacup = "Teacup",
  Sprinter = "Sprinter",
  Repetier = "Repetier",
  NanoDLP = "NanoDLP"
}

export enum DistanceUnit {
  mm ="mm",
  inch = "in"
}

export enum InputChannelState {
  awaitingAcknowledgement = "awaitingAcknowledgement",
  idle = "idle",
  executing = "executing",
  waiting = "waiting",
  reading = "reading"
}

interface InputChannel {
  axesRelative: boolean;
  compatibility: Compatibility;
  distanceUnit: DistanceUnit;
  drivesRelative: boolean;
  feedRate: number;
  inMacro: boolean;
  macroRestartable: boolean;
  motionSystem: number;
  name: string;
  selectedPlane: number;
  stackDepth: number;
  state: InputChannelState;
  lineNumber: number | bigint;
  volumetric: boolean;
}

export default InputChannel