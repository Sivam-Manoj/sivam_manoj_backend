const crypto = require('crypto')

const secrettoken = crypto.randomBytes(128)

const base64token = secrettoken.toString('base64')

console.log(base64token)