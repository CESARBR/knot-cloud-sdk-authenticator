import axios from 'axios';
import url from 'url';

function throwError(message) {
  const error = new Error(message);
  throw error;
}

export default class Client {
  constructor({
    protocol = 'https', hostname, port = 443, pathname = '',
  }) {
    if (protocol !== 'http' && protocol !== 'https') {
      throwError('Unexpected protocol');
    }

    if (!hostname) {
      throwError('Required option hostname is missing');
    }

    this.options = {
      hostname,
      protocol,
      port,
      pathname,
    };
  }

  buildUri(protocol, hostname, port, pathname) {
    return url.format({
      protocol, hostname, port, pathname,
    });
  }

  async createUser(email, password) {
    const {
      protocol, hostname, port, pathname,
    } = this.options;
    const uri = this.buildUri(protocol, hostname, port, `${pathname}/users`);
    const response = await axios.post(uri, { email, password });
    return response.data;
  }

  async authUser(email, password) {
    const {
      protocol, hostname, port, pathname,
    } = this.options;
    const uri = this.buildUri(protocol, hostname, port, `${pathname}/auth`);
    const response = await axios.post(uri, { email, password });
    return response.data;
  }
}
