# knot-cloud-sdk-js-authenticator

KNoT Cloud authenticator service JavaScript library.

## Quickstart

### Install

```console
npm install --save @cesarbr/knot-cloud-sdk-js-authenticator
```

### Run

`KNoTCloudAuthenticator` connects to &lt;protocol&gt;://&lt;hostname&gt;:&lt;port&gt; using email and password as credentials. Replace this address with your authenticator instance and the credentials with valid ones.

```javascript
const KNoTCloudAuthenticator = require("@cesarbr/knot-cloud-sdk-js-authenticator");

const client = new KNoTCloudAuthenticator({
  protocol: "https",
  hostname: "api.knot.cloud",
  port: 443,
});

async function main() {
  try {
    const user = await client.createUser(
      "awesome@email.com",
      "strong-password"
    );
    console.log(user);
    const token = client.createToken("awesome@email.com", "strong-password");
    console.log(token);
  } catch (err) {
    console.error(err);
  }
}
main();
```

## Methods

### Constructor(options)

Create a client object that will connect to a KNoT Cloud protocol authenticator instance.

#### Arguments

- `config` **Object** JSON object with request details.
  - `protocol` **String** (Optional) Either `'http'` or `'https'`. Default: `'https'`.
  - `hostname` **String** KNoT Cloud authenticator instance hostname. Default `'api.knot.cloud'`.
  - `port` **Number** (Optional) KNoT Cloud authenticator instance port. Default: 80/443.

#### Example

```javascript
const KNoTCloudAuthenticator = require("@cesarbr/knot-cloud-sdk-js-authenticator");

const client = new KNoTCloudAuthenticator({
  protocol: "https",
  hostname: "api.knot.cloud",
  port: 443,
});
```

### createUser(email, password) &lt;Object&gt;

Creates a new user.

#### Arguments

- `email` **String** User email.
- `password` **String** User password in plain text.

#### Result

- `user` **Object** JSON object containing the created user's credentials.

#### Example

```javascript
const KNoTCloudAuthenticator = require("@cesarbr/knot-cloud-sdk-js-authenticator");

const client = new KNoTCloudAuthenticator({
  protocol: "https",
  hostname: "api.knot.cloud",
  port: 443,
});

async function main() {
  try {
    const user = await client.createUser(
      "awesome@email.com",
      "strong-password"
    );
  } catch (err) {
    console.error(err);
  }
}
main();

// {
//  email: 'awesome@email.com',
//  password: 'strong-password',
// }
```

### createToken(email, password): &lt;Object&gt;

Generates a new access token for the user.

#### Arguments

- `email` **String** User email.
- `password` **String** User password, in plain text.

#### Result

- `token` **Object** JSON object containing the user's new access token.

#### Example

```javascript
const KNoTCloudAuthenticator = require("@cesarbr/knot-cloud-sdk-js-authenticator");

const client = new KNoTCloudAuthenticator({
  protocol: "https",
  hostname: "api.knot.cloud",
  port: 443,
});

async function main() {
  try {
    const token = await client.createToken(
      "awesome@email.com",
      "strong-password"
    );
    console.log(token);
  } catch (err) {
    console.error(err);
  }
}
main();

// {
//  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODcxMjkzNzIsImlhdCI6MTU4NzA5MzM3MiwiaXNzIjoibWFpbmZsdXguYXV0aG4iLCJzdWIiOiJkYWRhdmR2YkBrbm90LmNvbSIsInR5cGUiOjB9._lbRa2fzI_CvEorbEACVAf2UnHvkiCOORY55wCWUGAs'
// }
```

### createSession(token): &lt;Object&gt;

Generates a new session ID for the user, which will be used to receive thing's data.

#### Arguments

- `token` **String** User or application token.

#### Result

- `session` **Object** JSON object containing the user's new session ID.
  - `id` **String** user session ID.

#### Example

```javascript
const KNoTCloudAuthenticator = require("@cesarbr/knot-cloud-sdk-js-authenticator");

const client = new KNoTCloudAuthenticator({
  protocol: "https",
  hostname: "api.knot.cloud",
  port: 443,
});

async function main() {
  try {
    const { token } = await client.createToken(
      "awesome@email.com",
      "strong-password"
    );
    const session = await client.createSession(token);
    console.log(session);
  } catch (err) {
    console.error(err);
  }
}
main();

// {
//   "id": "1t4izjcdHSYxfEZ9DUWMNewtlpR"
// }
```
