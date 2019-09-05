const Promise = require('bluebird');

const { get } = require('lodash');
const vault = require('../utils/client');

async function fetchSecret(match) {
  const { id, secret, field, version } = match;

  try {
    const response = await vault.get(`secret/data/${secret}`, {
      params: {
        version,
      },
    });

    if (field === '*') {
      const value = get(response, ['data', 'data', 'data']);
      return {
        ...match,
        secret: JSON.stringify(value, null, 2),
      };
    }

    const value = get(response, ['data', 'data', 'data', field]);

    return {
      ...match,
      secret: value,
    };
  } catch (err) {
    const statusCode = get(err, 'response.status');

    if (statusCode === 404) {
      throw new Error(`Secret not found: ${id}`);
    }

    if (statusCode === 403) {
      throw new Error(`Permission denied (usually an invalid token)`);
    }

    throw err;
  }
}

module.exports.fetchSecret = fetchSecret;

module.exports.fetchSecrets = function(matches = []) {
  return Promise.map(matches, fetchSecret);
};
