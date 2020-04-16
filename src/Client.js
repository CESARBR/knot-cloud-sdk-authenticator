import HTTP from './network/HTTP';

export default class Client {
  constructor(config) {
    this.http = new HTTP(config);
  }

  async createUser(email, password) {
    const body = { email, password };
    return this.http.post('users', body);
  }
}
