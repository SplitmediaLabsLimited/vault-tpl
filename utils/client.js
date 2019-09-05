const config = require('./config');
const axios = require('axios');

const instance = axios.create({
  baseURL: `${config.VAULT_ADDR}/v1/`,
  timeout: 100000,
  headers: { 'x-vault-token': config.VAULT_TOKEN },
});

module.exports = instance;
