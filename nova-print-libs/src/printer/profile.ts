export enum PrinterVolumeFormFactor {
  Circular = 'circular',
  Rectangular = 'rectangular',
}

export enum PrinterVolumeOrigin {
  LowerLeft = 'lower-left',
  Center = 'center',
}

export interface PrinterVolume {
  width: number;
  depth: number;
  height: number;
  formFactor: PrinterVolumeFormFactor;
  origin: PrinterVolumeOrigin;
}

export interface PrinterExtruders {
  count: number;
  nozzleDiameter: number;
  sharedNozzle: boolean;
  defaultExtrusionLength: number;
  defaultExtrusionFeedrate: number;
}

export interface PrinterAxis {
  defauaultSpeed: number;
}

export interface PrinterAxes {
  x: PrinterAxis;
  y: PrinterAxis;
  z: PrinterAxis;
}

export interface ProfileTemplate {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  volume: PrinterVolume;
  hasHeatedBed: boolean;
  hasHeatedChamber: boolean;
  extruders: PrinterExtruders;
  axes: PrinterAxes;
}

export interface Profile extends ProfileTemplate {
  nodeId: string;
  serialPort: string;
  baudRate: number;
}
