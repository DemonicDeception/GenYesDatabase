var admin = require("firebase-admin");
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const wait = require('util').promisify(setTimeout);
const port = 3000
var serviceAccount = require("./DataBaseKeys.json");
const db = admin.firestore();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/html/index.html'))
})
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})