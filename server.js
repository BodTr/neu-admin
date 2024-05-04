var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'dist'))); //  "public" off of current is root
app.get(/.*/, function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(5173);
console.log('Listening on port 5173');