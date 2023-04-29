export enum AccessLevel {
  readOnly = 'readOnly',
  readWrite = 'readWrite',
}

export enum SessionType {
  local = 'local',
  http = 'http',
  telnet = 'telnet',
}

interface UserSession {
  accessLevel: AccessLevel;
  id: number;
  origin: string | null;
  originId: number;
  sessionType: SessionType;
}

export default UserSession;
