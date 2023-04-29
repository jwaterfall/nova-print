export enum AxisLetter {
  X = 'X',
  Y = 'Y',
  Z = 'Z',
  U = 'U',
  V = 'V',
  W = 'W',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  a = 'a',
  b = 'b',
  c = 'c',
  d = 'd',
  e = 'e',
  f = 'f',
  none = '',
}

export interface Microstepping {
  interpolated: boolean;
  value: number;
}

export interface Axis {
  acceleration: number;
  babystep: number;
  current: number;
  drivers: string[];
  homed: boolean;
  jerk: number;
  letter: AxisLetter;
  machinePosition: number | null;
  max: number;
  maxProbed: boolean;
  microstepping: Microstepping;
  min: number;
  minProbed: boolean;
  percentCurrent: number;
  percentStstCurrent: number | null;
  speed: number;
  stepsPerMm: number;
  userPosition: number | null;
  visible: boolean;
  workplaceOffsets: number[];
}

export interface MoveDeviations {
  deviation: number;
  mean: number;
}

export interface MoveCalibration {
  final: MoveDeviations;
  initial: MoveDeviations;
  numFactors: number;
}

export interface MoveQueueItem {
  gracePeriod: number;
  length: number;
}

export interface ProbeGrid {
  axes: string[];
  maxs: number[];
  mins: number[];
  radius: number;
  spacings: number[];
}

export interface Skew {
  compensateXY: boolean;
  tanXY: number;
  tanXZ: number;
  tanYZ: number;
}

export enum MoveCompensationType {
  none = 'none',
  mesh = 'mesh',
}

export interface MoveCompensation {
  fadeHeight: number | null;
  file: string | null;
  liveGrid: ProbeGrid | null;
  meshDeviation: MoveDeviations | null;
  readonly probeGrid: ProbeGrid;
  readonly skew: Skew;
  type: MoveCompensationType;
}

export interface CurrentMove {
  acceleration: number;
  deceleration: number;
  extrusionRate: number;
  laserPwm: number | null;
  requestedSpeed: number;
  topSpeed: number;
}

export interface ExtruderNonlinear {
  a: number;
  b: number;
  upperLimit: number;
}

export interface Extruder {
  acceleration: number;
  current: number;
  driver: string;
  filament: string;
  filamentDiameter: number;
  factor: number;
  jerk: number;
  microstepping: Microstepping;
  nonlinear: ExtruderNonlinear;
  percentCurrent: number;
  percentStstCurrent: number | null;
  position: number;
  pressureAdvance: number;
  rawPosition: number;
  speed: number;
  stepsPerMm: number;
}

export interface MotorsIdleControl {
  factor: number;
  timeout: number;
}

export enum KinematicsName {
  cartesian = 'cartesian',
  coreXY = 'coreXY',
  coreXYU = 'coreXYU',
  coreXYUV = 'coreXYUV',
  coreXZ = 'coreXZ',
  markForged = 'markForged',
  fiveBarScara = 'FiveBarScara',
  hangprinter = 'Hangprinter',
  delta = 'delta',
  polar = 'Polar',
  rotaryDelta = 'Rotary delta',
  scara = 'Scara',
}

export interface MoveSegmentation {
  segmentsPerSec: number;
  minSegmentLength: number;
}

export interface MoveRotation {
  angle: number;
  centre: number[];
}

export interface TiltCorrection {
  correctionFactor: number;
  lastCorrections: number[];
  maxCorrection: number;
  screwPitch: number;
  screwX: number[];
  screwY: number[];
}

export interface KinematicsBase {
  segmentation: MoveSegmentation;
}

export interface ZLeadscrewKinematics extends KinematicsBase {
  tiltCorrection: TiltCorrection;
}

export interface CoreKinematics extends ZLeadscrewKinematics {
  name: KinematicsName.cartesian | KinematicsName.coreXY | KinematicsName.coreXYU | KinematicsName.coreXYUV | KinematicsName.coreXZ | KinematicsName.markForged;
  forwardMatrix: number[][];
  inverseMatrix: number[][];
}

export interface DeltaTower {
  angleCorrection: number;
  diagonal: number;
  endstopAdjustment: number;
  xPos: number;
  yPos: number;
}

export interface DeltaKinematics extends KinematicsBase {
  name: KinematicsName.delta | KinematicsName.rotaryDelta;
  deltaRadius: number;
  homedHeight: number;
  printRadius: number;
  towers: DeltaTower[];
  xTilt: number;
  yTilt: number;
}

export interface HangprinterKinematics extends KinematicsBase {
  name: KinematicsName.hangprinter;
  anchors: number[][];
  printRadius: number;
}

export interface PolarKinematics extends KinematicsBase {
  name: KinematicsName.polar;
}

export interface ScaraKinematics extends ZLeadscrewKinematics {
  name: KinematicsName.scara | KinematicsName.fiveBarScara;
}

export type Kinematics = CoreKinematics | DeltaKinematics | HangprinterKinematics | PolarKinematics | ScaraKinematics;

export enum InputShapingType {
  none = 'none',
  mzv = 'mzv',
  zvd = 'zvd',
  zvdd = 'zvdd',
  zvddd = 'zvddd',
  ei2 = 'ei2',
  ei3 = 'ei3',
  custom = 'custom',
}

export interface InputShaping {
  amplitudes: number[];
  damping: number;
  durations: number[];
  frequency: number;
  minAcceleration: number;
  type: InputShapingType;
}

interface Move {
  axes: Axis[];
  calibration: MoveCalibration;
  compensation: MoveCompensation;
  currentMove: CurrentMove;
  extruders: Extruder[];
  idle: MotorsIdleControl;
  kinematics: Kinematics;
  limitAxes: boolean;
  noMovesBeforeHoming: boolean;
  printingAcceleration: number;
  queue: MoveQueueItem[];
  rotation: MoveRotation;
  shaping: InputShaping;
  speedFactor: number;
  travelAcceleration: number;
  virtualEPos: number;
  workplaceNumber: number;
}

export default Move;
