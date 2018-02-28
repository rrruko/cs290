const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.json())

var MongoClient = require('mongodb').MongoClient

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))
app.get('/style/lit.css', 
  (req, res) => res.sendFile(__dirname + '/style/lit.css'))
app.get('/style/style.css', 
  (req, res) => res.sendFile(__dirname + '/style/style.css'))
app.get('/skeleton.gif', 
  (req, res) => res.sendFile(__dirname + '/img/skeleton.gif'))
app.get('/script/client.js',
  (req, res) => res.sendFile(__dirname + '/script/client.js'))
  
app.get('/get/country', (req, res) => {
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) throw 'dead'
    const db = client.db('countries')
    db.collection('countries').find().toArray(function (err, result) {
      if (err) {
        res.status(404).send('not found')
      } else {
        res.send(result)
      }
    })
  })
})
  
app.put('/exchange/:country', (req, res) => {
  console.log('got put req')
  
  let body = req.body
  console.log('got put: ' + JSON.stringify(req.body))
  res.send(req.body)
  
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) throw 'dead'
    const db = client.db('countries')
    db.collection('countries').update(
      {name: body.name},
      {
        name: body.name,
        currency: body.currency, 
        rate: body.rate, 
        commission: body.commission,
        notation: body.notation
      }, 
      {upsert: true}
    )
  })
})

app.post('/exchange/:country', (req, res) => {
  let body = req.body
  console.log('got post: ' + JSON.stringify(req.body))
  res.send(req.body)
  
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) throw 'dead'
    const db = client.db('countries')
    db.collection('countries').update(
      {name: body.name},
      {
        name: body.name,
        currency: body.currency, 
        rate: body.rate, 
        commission: body.commission,
        notation: body.notation
      }, 
      {upsert: true}
    )
  })
})

app.get('/exchange/:country', (req, res) => {
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) throw 'dead'
    console.log('get request for ' + req.params.country)
    const db = client.db('countries')
    db.collection('countries')
      .find({name: req.params.country})
      .toArray(function (err, result) {
        console.log('    returned object ' + result[0]  + ' successfully')
        res.send(result[0])
      })
  })
})

app.listen(process.env.PORT,
  () => console.log('Listening on ' + process.env.PORT))