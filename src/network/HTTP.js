import axios from 'axios';

export default class HTTP {
  constructor({ protocol = 'https', hostname = 'localhost', port = 8180 }) {
    if ((protocol !== 'http') && (protocol !== 'https')) {
      throw new Error('Invalid protocol: must be either \'https\' or \'http\'');
    }

    if (!hostname) {
      throw new Error('Required field missing: \'hostname\'');
    }

    this.baseUrl = `${protocol}://${hostname}:${port}`;
    this.header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  async post(path, data) {
    const config = {
      url: `${this.baseUrl}/${path}`,
      method: 'POST',
      headers: this.header,
      data: data && JSON.stringify(data),
    };

    return axios(config)
      .then(res => this.handleRet(res))
      .catch(err => this.handleRet(err));
  }

  async handleRet({ status, response, data }) {
    switch (status) {
      case 201:
        return Promise.resolve(data || status);
      default:
        return Promise.reject(Error(`${status || response.data.error} (${status || response.status})`.toLowerCase()));
    }
  }
}
