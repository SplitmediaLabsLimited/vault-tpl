const { red, yellow, magenta } = require('colorette');

module.exports = async function validate() {
  const config = require('./config');

  if (!config.VAULT_ADDR) {
    console.log(`${red(`ERROR:`)} ${yellow(`VAULT_ADDR`)} is not set in the environment.`);
    process.exit(1);
  }

  if (!config.VAULT_TOKEN) {
    console.log(`${red(`ERROR:`)} ${yellow(`VAULT_TOKEN`)} is not set in the environment.`);
    console.log(`You can either:`);
    console.log(` - Write a ${magenta(`.vault-token`)} file in your home directory`);
    console.log(` - Set it => ${magenta(`VAULT_TOKEN=token`)}`);
    console.log(` - Set a path for it => ${magenta(`VAULT_TOKEN_PATH=path/to/token`)}`);
    process.exit(1);
  }

  return config;
};
