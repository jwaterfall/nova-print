import axios from 'axios';
import dayjs from 'dayjs';

import Connector, { BoardType, ConnectResponse, ConnectStatus, DisconnectStatus } from './Connector';

interface RRConnectResponse {
    err: number;
    sessionTimeout: number;
    boardType: BoardType;
}

interface RRDisconnectResponse {
    err: number;
}

class StandaloneConnector implements Connector {
    constructor(private host: string) {}

    public async connect(password?: string): Promise<ConnectResponse> {
        try {
            const response = await axios.get<RRConnectResponse>(`http://${this.host}/rr_connect`, {
                params: {
                    password,
                    time: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
                },
            });

            const { err: status, sessionTimeout, boardType } = response.data;

            switch (status) {
                case 0:
                    return {
                        status: ConnectStatus.SUCCESS,
                        sessionTimeout,
                        boardType,
                    };
                case 1:
                    return { status: ConnectStatus.INVALID_PASSWORD };
                case 2:
                    return { status: ConnectStatus.NO_SESSIONS_AVAILABLE };
                default:
                    return { status: ConnectStatus.FAIL };
            }
        } catch (e) {
            return {
                status: ConnectStatus.FAIL,
            };
        }
    }

    public async disconnect(): Promise<DisconnectStatus> {
        try {
            const response = await axios.get<RRDisconnectResponse>(`http://${this.host}/rr_disconnect`);

            if (response.data.err === 0) {
                return DisconnectStatus.SUCCESS;
            }

            return DisconnectStatus.FAIL;
        } catch (e) {
            return DisconnectStatus.FAIL;
        }
    }

    public async getMcuTemp(): Promise<number> {
        try {
            const response = await axios.get(`http://${this.host}/rr_model`, {
                params: {
                    key: 'boards',
                },
            });

            return response.data.result[0].mcuTemp.current;
        } catch (e) {
            return -1;
        }
    }

    public async getFirmwareVersion(): Promise<string> {
        try {
            const response = await axios.get(`http://${this.host}/rr_model`, {
                params: {
                    key: 'boards',
                },
            });

            return response.data.result[0].firmwareVersion;
        } catch (e) {
            return '';
        }
    }
}

export default StandaloneConnector;
