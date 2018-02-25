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
    db.collection('countries').find().toArray()
      .then(stuff => res.send(stuff))
  })
})
  
app.put('/put/country', (req, res) => {
  console.log(JSON.stringify(req.body))
  res.send(req.body)
  
  let name = req.body.name
  let rate = req.body.rate
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) throw 'dead'
    const db = client.db('countries')
    console.log('ok')
    db.collection('countries').update(
      {name: name},
      {name: name, rate: rate}, 
      {upsert: true}
    )
  })
})

app.listen(process.env.PORT,
  () => console.log('Listening on ' + process.env.PORT))