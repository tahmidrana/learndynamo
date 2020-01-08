const express = require('express')
const router = express.Router()
const {dynamodb} = require('../config/db')

router.get('/create-table', (req, res) => {
    const params = {
      TableName : "products",
      KeySchema: [
        { AttributeName: "id", KeyType: "HASH"},  //Partition key
      ],
      AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    };
    dynamodb.createTable(params, function(err, data) {
        if (err) {
          res.send("Unable to create table. Error JSON:", JSON.stringify(err, null, 2))
          console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
          console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
          res.send('Table Created');
        }
    });
})
  
router.get('/delete-table', (req, res) => {
    var params = {
      TableName : "products"
    }
  
    dynamodb.deleteTable(params, function(err, data) {
      if (err) {
        res.send("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2))
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        res.send("Deleted table. Table description JSON:", JSON.stringify(data, null, 2))
        console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
      }
    });
})

module.exports = router