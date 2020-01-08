const AWS = require("aws-sdk");

AWS.config.update({
  region: "local",
  accessKeyId: 'fakeMyKeyId',
  secretAccessKey: 'fakeSecretAccessKey',
  endpoint: "http://localhost:8000"
});
const dynamodb = new AWS.DynamoDB()
const docClient = new AWS.DynamoDB.DocumentClient()

module.exports = {
  dynamodb,
  docClient
}