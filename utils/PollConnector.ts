import axios from 'axios';
import dayjs from 'dayjs';
import { ModelKey, ModelValue } from './Model';

class PollConnector {
  constructor(private host: string) {}

  public async connect(password?: string) {
    const response = await axios.get(`http://${this.host}/rr_connect`, {
      params: {
        password,
        time: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
      },
    });

    const { err, sessionTimeout, isEmulated, apiLevel } = response.data;

    switch (err) {
      case 0:
        if (isEmulated) {
          throw new Error('Cancelling connection attempt because the remote endpoint is emulated');
        }

        if (apiLevel && apiLevel < 1) {
          throw new Error('Cancelling connection attempt because the remote endpoint is running an unsupported API version');
        }

        return {
          sessionTimeout,
          apiLevel,
        };
      case 1:
        throw new Error('Invalid password');
      case 2:
        throw new Error('No free sessions available');
      default:
        throw new Error(`Unknown error code: ${err}`);
    }
  }

  public async disconnect() {
    await axios.get(`http://${this.host}/rr_disconnect`);
  }

  public async getModel<T extends ModelKey>(key: T): Promise<ModelValue<T> | null> {
    const response = await axios.get(`http://${this.host}/rr_model`, {
      params: { key },
      timeout: 5000,
    });

    return response.data.result;
  }
}

export default PollConnector;
