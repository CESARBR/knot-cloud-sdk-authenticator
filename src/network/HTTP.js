import axios from 'axios';

export default class HTTP {
  constructor({
    protocol = 'https',
    hostname = 'api.knot.cloud',
    port = (protocol === 'https') ? 443 : 80,
    pathname = '',
  }) {
    if ((protocol !== 'http') && (protocol !== 'https')) {
      throw new Error('Invalid protocol: must be either \'https\' or \'http\'');
    }
    if (!hostname) {
      throw new Error('Required field missing: \'hostname\'');
    }

    this.baseUrl = `${protocol}://${hostname}:${port}${pathname}`;
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
    /*
    * Reject with a detailed error if the response was correctly received.
    * Otherwise, reject with an unexpected error.
    */
    const props = r.response
      ? { message: r.response.data.message, code: r.response.status }
      : { message: r.message, code: 500 };
    const error = Error(props.message);
    error.code = props.code;
    return Promise.reject(error);
  }
}
