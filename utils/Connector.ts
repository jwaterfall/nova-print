export enum BoardType {
    DUET_06 = 'duet06',
    DUET_07 = 'duet07',
    DUET_085 = 'duet085',
    DUET_WIFI_10 = 'duetwifi10',
    DUET_WIFI_102 = 'duetwifi102',
    DUET_ETHERNET_10 = 'duetethernet10',
    DUET_ETHERNET_102 = 'duetethernet102',
    DUET_MAESTRO_100 = 'duetmaestro100',
    DUET_3_MB6HC_100 = 'duet3mb6hc100',
    DUET_3_MB6HC_101 = 'duet3mb6hc101',
    DUET_3_MB6XD = 'duet3mb6xd',
    DUET_5_LC_WIFI = 'duet5lcwifi',
    DUET_5_LC_ETHERNET = 'duet5lcethernet',
}

export enum ConnectStatus {
    SUCCESS = 'SUCCESS',
    INVALID_PASSWORD = 'INVALID_PASSWORD',
    NO_SESSIONS_AVAILABLE = 'NO_SESSIONS_AVAILABLE',
    FAIL = 'FAIL',
}

export enum DisconnectStatus {
    SUCCESS = 'SUCCESS',
    FAIL = 'FAIL',
}

export interface ConnectSuccessResponse {
    status: ConnectStatus.SUCCESS;
    sessionTimeout: number;
    boardType: BoardType;
}

export interface ConnectErrorResponse {
    status: ConnectStatus.INVALID_PASSWORD | ConnectStatus.NO_SESSIONS_AVAILABLE | ConnectStatus.FAIL;
}

export type ConnectResponse = ConnectSuccessResponse | ConnectErrorResponse;

export interface FanData {
    actualValue: number;
    requestedValue: number;
    rpm: number;
}

export interface GetSensorDataResponse {
    mcuTemp: number;
    vIn: number;
    fans: FanData[];
}

interface Connector {
    connect(host: string, password?: string): Promise<ConnectResponse>;
    disconnect(): Promise<DisconnectStatus>;
}

export default Connector;
