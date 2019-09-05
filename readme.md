# vault-tpl - Templating vault secrets

vault-tpl is a CLI application that replaces some tokens with secrets from Vault. You can use it to store secrets inside your repository and have them decrypted for development, for deployment or for any other reasons.

## Example

Input (secrets.yaml)

```yaml
MYSQL_PASSWORD: (( vault "production/mysql:MYSQL_PASSWORD@1" ))
GCLOUD_CREDENTIALS: (( vault "production/google:*@1" ))
```

Command

```
vault-tpl secrets.yaml --write --output secrets-output.yaml
```

Output (secrets-output.yaml)

```yaml
MYSQL_PASSWORD: hunter2
GCLOUD_CREDENTIALS: |-
  {
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "client_email": "",
    "client_id": "",
    "client_x509_cert_url": "",
    "private_key": "",
    "private_key_id": "",
    "project_id": "",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "type": "service_account"
  }
```

## Requirements

- A reachable [Vault](https://www.vaultproject.io) installation, stored as `VAULT_ADDR` in your environment
- A valid [Vault](https://www.vaultproject.io) token, stored as `VAULT_TOKEN`
- Node 10+

## Getting Started

```js
yarn global add vault-tpl
vault-tpl --help
```

## Why?

- Authentication is handled by Vault so you don't have to mess with GPG keys
- Supports Vault versioning, so secrets are immutable. If a secret has changed, it has to be modified in git also, to track accountability
- Supports outputting specific keys in a secret, or the whole object. Useful for GCloud Credentials and other JSON keys

## Thanks to

- [Hashicorp](https://www.hashicorp.com) for creating Vault
