import axios from 'axios';

export default class HTTP {
  constructor({
    protocol = 'https',
    hostname = 'api.knot.cloud',
    port = (protocol === 'https') ? 443 : 80,
  }) {
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
      .then(res => Promise.resolve(res.data || JSON.parse(res.config.data)))
      .catch(err => this.handleError(err));
  }

  async handleError(r) {
    if (r.response) {
      /*
      * The request was made and the server responded with a
      * status code that falls out of the range of 2xx
      */
      return Promise.reject(Error(`${r.response.data.error} (${r.response.status})`));
    } if (r.request) {
      /*
      * The request was made but no response was received, `error.request`
      * is an instance of XMLHttpRequest in the browser and an instance
      * of http.ClientRequest in Node.js
      */
      return Promise.reject(Error(`no response was received: ${r.message}`));
    }
    // Something happened in setting up the request and triggered an Error
    return Promise.reject(Error(`unexpected error: ${r.message}`));
  }
}
