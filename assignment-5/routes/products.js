const express = require('express')
const router = express.Router()
const uuidv4 = require('uuid/v4')
const {docClient} = require('../config/db')

/* Store A New Product. */
router.post('/', function(req, res) {
  const {title, qty, descr=''} = req.body
  const insData = {
    id:uuidv4(),
    title:title,
    qty:qty,
    descr: descr ? descr : 'N/A'
  }
  
  const params = {
    TableName: "products",
    Item: insData,
  }

  docClient.put(params, (error, data) => {
    if (error) {
      console.log('Error creating Product: ', error)
      res.send('Could not create Product')
    }
  })
  res.redirect('/')
})

/* Update A Product. */
router.post('/update', function(req, res, next) {
  const {productId, ptitle, pqty, pdescr} = req.body
  const params = {
    TableName: 'products',
    Key: {
      id: productId
    },
    ConditionExpression: 'attribute_exists(id)',
    UpdateExpression: 'SET title = :title, qty = :qty, descr = :descr',
    ExpressionAttributeValues: {
      ':title': ptitle,
      ':qty': pqty,
      ':descr': pdescr ? pdescr : 'N/A'
    },
    ReturnValues: 'UPDATED_NEW'
  }

  docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2))
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2))
    }
  })
  res.redirect('/')
})

/* GET a product detail */
router.get('/:id', function(req, res) {
  const id = req.params.id
  const params = {
    Key: {
      id: id
    },
    TableName: 'products'
  }

  docClient.get(params, function(err, data) {
    if (err) {
      res.send({
        success: false,
        message: 'Error: Server error'
      })
    } else {
      console.log('data', data)
      const { Item } = data
      res.render('layout', { vw_page: 'view_product', product: Item })
    }
  })
})

/* GET a product detail */
router.get('/:id/delete', function(req, res) {
  const id = req.params.id
  const params = {
    Key: {
      id: id
    },
    TableName: 'products'
  }

  docClient.delete(params, function(err, data) {
    if (err) {
      res.send({
        success: false,
        message: 'Error: Server error'
      })
    }
  })
  res.redirect('/')
})

/* GET a product detail AJAX */
router.get('/:id/ajax', function(req, res) {
  const id = req.params.id
  const params = {
    Key: {
      id: id
    },
    TableName: 'products'
  }

  docClient.get(params, function(err, data) {
    if (err) {
      res.send({
        success: false,
        message: 'Error: Server error'
      })
    } else {
      console.log('data', data)
      const { Item } = data   
      res.send({
        success: true,
        message: 'Loaded fruits',
        product: Item
      })
    }
  })
})

module.exports = router
