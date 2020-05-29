import Client from './Client';
import HTTP from './network/HTTP';

export default class Main extends Client {
  constructor(config) {
    const http = new HTTP(config);
    super(http);
  }
}
