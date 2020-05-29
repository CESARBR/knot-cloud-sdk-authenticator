import HTTP, * as httpMocks from './network/HTTP';
import Client from './Client';

jest.mock('./network/HTTP');

const email = 'knot@knot.com';
const password = '123qwe123qwe';

describe('SDK Authenticator', () => {
  beforeEach(() => {
    httpMocks.mockPost.mockClear();
  });

  test('should create a new user when connection is ok', async () => {
    const http = new HTTP();
    const client = new Client(http);
    await client.createUser(email, password);
    expect(httpMocks.mockPost).toHaveBeenCalled();
  });

  test('should fail to create a new user when something goes wrong', async () => {
    const postErr = 'error in post request';
    const http = new HTTP({ postErr });
    const client = new Client(http);
    let error;
    try {
      await client.createUser(email, password);
    } catch (err) {
      error = err.message;
    }
    expect(error).toBe(postErr);
  });
});
