export interface BuildObject {
  cancelled: boolean;
  name: string | null;
  x: (number | null)[];
  y: (number | null)[];
}

export interface Build {
  currentObject: number;
  m486names: boolean;
  m486numbers: boolean;
  objects: BuildObject[];
}

export interface Layer {
  duration: number;
  filament: number[];
  fractionPrinted: number;
  height: number;
  temperatures: number[];
}

export interface TimesLeft {
  filament: number | null;
  file: number | null;
  slicer: number | null;
}

export enum ThumbnailFormat {
  jpeg = 'jpeg',
  png = 'png',
  qoi = 'qoi',
}

export interface ThumbnailInfo {
  data: string | null;
  format: ThumbnailFormat;
  height: number;
  offset: number;
  size: number;
  width: number;
}

export interface GCodeFileInfo {
  filament: number[];
  fileName: string;
  generatedBy: string;
  height: number;
  lastModified: string | null;
  layerHeight: number;
  numLayers: number;
  printTime: number | bigint | null;
  simulatedTime: number | bigint | null;
  size: number | bigint;
  thumbnails: ThumbnailInfo[];
}

interface Job {
  build: Build;
  duration: number | null;
  file: GCodeFileInfo | null;
  filePosition: number | bigint | null;
  lastDuration: number | null;
  lastFileName: string | null;
  lastFileAborted: boolean;
  lastFileCancelled: boolean;
  lastFileSimulated: boolean;
  lastWarmUpDuration: number | null;
  layer: number | null;
  layers: Layer[];
  layerTime: number | null;
  pauseDuration: number | null;
  rawExtrusion: number | null;
  timesLeft: TimesLeft;
  warmUpDuration: number | null;
}

export default Job;
