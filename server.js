const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let comments = [];

app.get('/', (req, res) => res.sendfile('client.html'));
app.get('/get/comments', (req, res) => res.send(comments));
app.post('/post/comments', (req, res) => {
  console.log("got post: ", req.body.payload);
  comments.push(req.body.payload);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
