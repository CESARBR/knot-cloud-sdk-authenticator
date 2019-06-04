/* global describe,test,beforeEach,expect,jest */
import axios from 'axios';
import Client from 'Client';

jest.mock('axios');

describe('Client', () => {
  let client;

  beforeEach(() => {
    client = new Client({ protocol: 'http', hostname: 'test' });
  });

  describe('constructor', () => {
    test('should set protocol https and port 443 as default', async () => {
      const instance = new Client({ hostname: 'test' });
      const response = { data: { uuid: 'uuid-mocked', token: 'token-mocked' } };
      axios.post.mockResolvedValueOnce(response);

      await instance.createUser('test@test.com', '123qwe!@#QWE');

      const calledUri = axios.post.mock.calls[0][0];
      expect(calledUri).toBe('https://test:443/users');
    });

    test('should throw missing hostname when constructed without hostname', () => {
      expect(() => new Client({}))
        .toThrow();
    });

    test('should throw unexpected protocol when constructed without http nor https', () => {
      expect(() => new Client({ protocol: 'invalid-protocol', hostname: 'test' }))
        .toThrow();
    });
  });

  describe('create user', () => {
    test('should call post', async () => {
      const user = { email: 'test@test.com', password: '123qwe!@#QWE' };
      const resp = { data: { uuid: 'uuid-mocked', token: 'token-mocked' } };

      axios.post.mockResolvedValueOnce(resp);

      await client.createUser(user.email, user.password);

      return expect(axios.post).toBeCalled();
    });

    test("uri path should be 'http://test:443/users'", async () => {
      expect(axios.post).lastCalledWith('http://test:443/users', { email: 'test@test.com', password: '123qwe!@#QWE' });
    });

    test('should create user', async () => {
      const user = { email: 'test@test.com', password: '123qwe!@#QWE' };
      const resp = { data: { uuid: 'uuid-mocked', token: 'token-mocked' } };

      axios.post.mockResolvedValueOnce(resp);

      const data = await client.createUser(user.email, user.password);

      return expect(data).toEqual(resp.data);
    });

    test('should throw error when could not create user', async () => {
      const user = { email: 'test@test.com', password: '123qwe!@#QWE' };

      axios.post.mockRejectedValueOnce(new Error('unknown error'));

      await expect(client.createUser(user.email, user.password)).rejects.toThrow();
    });
  });

  describe('authenticate user', () => {
    test('should call post', async () => {
      const user = { email: 'test@test.com', password: '123qwe!@#QWE' };
      const resp = { data: { uuid: 'uuid-mocked', token: 'token-mocked' } };

      axios.post.mockResolvedValueOnce(resp);

      await client.authUser(user.email, user.password);

      return expect(axios.post).toBeCalled();
    });

    test("uri path should be 'http://test:443/auth'", async () => {
      expect(axios.post).lastCalledWith('http://test:443/auth', { email: 'test@test.com', password: '123qwe!@#QWE' });
    });

    test('should auth user', async () => {
      const user = { email: 'test@test.com', password: '123qwe!@#QWE' };
      const resp = { data: { uuid: 'uuid-mocked', token: 'token-mocked' } };

      axios.post.mockResolvedValueOnce(resp);

      const data = await client.authUser(user.email, user.password);

      return expect(data).toEqual(resp.data);
    });

    test('should throw error when could not authenticate an user', async () => {
      const user = { email: 'test@test.com', password: '123qwe!@#QWE' };

      axios.post.mockRejectedValueOnce(new Error('unknown error'));

      await expect(client.authUser(user.email, user.password)).rejects.toThrow();
    });
  });
});
