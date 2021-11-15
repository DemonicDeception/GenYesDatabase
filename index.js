const express = require('express');
const discord = require('discord.js');
const app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(4000, () => {
  console.log('server started');
});
