const express = require('express')
const router = express.Router()
const {dynamodb} = require('../config/db')

/* GET home page. */
router.get('/', (req, res) => {
  const params = {
    TableName: 'products'
  };    
  dynamodb.scan(params, function(err, data) {
    if (err) {
      res.send('Server Error');
    } else {
      const { Items } = data;        
      res.render('layout', { vw_page: 'index', items: Items })
    }
  })
})

module.exports = router;
