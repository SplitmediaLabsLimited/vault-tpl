require('dotenv').config({ silent: true });
const { readFileSync } = require('fs');
const { resolve } = require('path');

function getToken() {
  if (process.env.VAULT_TOKEN) {
    return process.env.VAULT_TOKEN.trim();
  }

  if (process.env.VAULT_TOKEN_PATH) {
    return readFileSync(process.env.VAULT_TOKEN_PATH, 'utf8').trim();
  }

  const defaultPath = resolve(process.env.HOME, '.vault-token');

  return readFileSync(defaultPath, 'utf8').trim();
}

const config = {
  VAULT_ADDR: process.env.VAULT_ADDR,
  VAULT_TOKEN: getToken(),
};

module.exports = config;
