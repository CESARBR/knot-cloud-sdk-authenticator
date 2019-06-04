# knot-cloud-sdk-js-authenticator

KNoT Cloud authenticator service JavaScript library

# Quickstart

## Install

```console
npm install --save @cesarbr/knot-cloud-sdk-js-authenticator
```

## Run

`KNoTCloudAuthenticator` connects to &lt;protocol&gt;://&lt;hostname&gt;:&lt;port&gt; using email and password as credentials. Replace this address with your authenticator instance and the credentials with valid ones.

```javascript
const KNoTCloudAuthenticator = require('@cesarbr/knot-cloud-sdk-js-authenticator');

const client = new KNoTCloudAuthenticator({
  protocol: 'https',
  hostname: 'auth.knot.cloud',
});

async function main() {
  try {
    console.log(await client.authUser('user@provider.com', '123qwe!@#QWE'));
  } catch (err) {
    if (err.response) {
      console.error(err.response.data.message);
      return;
    }
    console.error(err);
  }
}
main();
```

# Methods

## constructor(options)

Create a client object that will connect to a KNoT Cloud protocol authenticator instance.

### Arguments
- `options` **Object** JSON object with request details.
  * `protocol` **String** (Optional) Either `'http'` or `'https'`. Default: `'https'`.
  * `hostname` **String** KNoT Cloud authenticator instance host name.
  * `port` **Number** (Optional) KNoT Cloud authenticator instance port. Default: 443.
  * `pathname` **String** (Optional) Path name on the server.

### Example

```javascript
const KNoTCloudAuthenticator = require('@cesarbr/knot-cloud-sdk-js-authenticator');

const client = new KNoTCloudAuthenticator({
  protocol: 'https',
  hostname: 'auth.knot.cloud',
});
```

## createUser(email, password): &lt;Object&gt;

Creates a new user.

### Arguments
* `email` **String** User email.
* `password` **String** User password in plain text.
### Result
- `user` **Object** JSON object containing user credentials after creation on cloud.

### Example

```javascript
const KNoTCloudAuthenticator = require('@cesarbr/knot-cloud-sdk-js-authenticator');

const client = new KNoTCloudAuthenticator({
  protocol: 'https',
  hostname: 'auth.knot.cloud',
});

async function main() {
  try {
    console.log(await client.createUser('user@provider.com', '123qwe!@#QWE'));
  } catch (err) {
    if (err.response) {
      console.error(err.response.data.message);
      return;
    }
    console.error(err);
  }
}
main();

// { id: '863ad780-efd9-4158-b24a-026de3f1dffb'
//   token: '40ad864d503488eda9b629825876d46cb1356bdf' }
```

## authUser(email, password): &lt;Object&gt;

Authenticate a user.

### Arguments
  * `email` **String** User email.
  * `password` **String** User password in plain text.
### Result
- `user` **Object** JSON object containing user credentials after authentication on cloud.

### Example

```javascript
const KNoTCloudAuthenticator = require('@cesarbr/knot-cloud-sdk-js-authenticator');

const client = new KNoTCloudAuthenticator({
  protocol: 'https',
  hostname: 'auth.knot.cloud',
});

async function main() {
  try {
    console.log(await client.authUser('user@provider.com', '123qwe!@#QWE'));
  } catch (err) {
    if (err.response) {
      console.error(err.response.data.message);
      return;
    }
    console.error(err);
  }
}
main();

// { id: '863ad780-efd9-4158-b24a-026de3f1dffb'
//   token: '40ad864d503488eda9b629825876d46cb1356bdf' }
```

## forgotPassword(email): &lt;Void&gt;

Tells to cloud that a user forgot its password. The cloud then sends an email with a token
to reset the password.

### Arguments
* `email` **String** User email.

### Example

```javascript
const KNoTCloudAuthenticator = require('@cesarbr/knot-cloud-sdk-js-authenticator');

const client = new KNoTCloudAuthenticator({
  protocol: 'https',
  hostname: 'auth.knot.cloud',
});

async function main() {
  try {
    await client.forgotPassword('user@provider.com');
  } catch (err) {
    if (err.response) {
      console.error(err.response.data.message);
      return;
    }
    console.error(err);
  }
}
main();
```

## resetPassword(email, token, newPassword): &lt;Void&gt;

Resets a password from a user.

### Arguments
* `email` **String** User email.
* `token` **String** Token sent by email.
* `newPassword` **String** User password in plain text.

### Example

```javascript
const KNoTCloudAuthenticator = require('@cesarbr/knot-cloud-sdk-js-authenticator');

const client = new KNoTCloudAuthenticator({
  protocol: 'https',
  hostname: 'auth.knot.cloud',
});

async function main() {
  try {
    const token = '54ad864d5034887419b629825876d46cb1356b06';
    const newPassword = 'QWEqwe!@#123';
    await client.resetPassword('user@provider.com', token, newPassword);
  } catch (err) {
    if (err.response) {
      console.error(err.response.data.message);
      return;
    }
    console.error(err);
  }
}
main();
```
