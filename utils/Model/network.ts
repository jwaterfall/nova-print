export enum NetworkProtocol {
  HTTP = 'http',
  HTTPS = 'https',
  FTP = 'ftp',
  SFTP = 'sftp',
  Telnet = 'telnet',
  SSH = 'ssh',
}

export enum NetworkInterfaceState {
  disabled = 'disabled',
  enabled = 'enabled',
  starting1 = 'starting1',
  starting2 = 'starting2',
  changingMode = 'changingMode',
  establishingLink = 'establishingLink',
  obtainingIP = 'obtainingIP',
  connected = 'connected',
  active = 'active',
}

export enum NetworkInterfaceType {
  lan = 'lan',
  wifi = 'wifi',
}

export interface NetworkInterface {
  activeProtocols: NetworkProtocol[];
  actualIP: string | null;
  configuredIP: string | null;
  dnsServer: string | null;
  firmwareVersion: string | null;
  gateway: string | null;
  mac: string | null;
  numReconnects: number | null;
  signal: number | null;
  speed: number | null;
  state: NetworkInterfaceState | null;
  subnet: string | null;
  type: NetworkInterfaceType;
}

interface Network {
  corsSite: string | null;
  hostname: string;
  interfaces: NetworkInterface[];
  name: string;
}

export default Network;
