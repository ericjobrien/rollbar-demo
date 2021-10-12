const express = require('express');
const path = require('path');
const Rollbar = require('rollbar');
const Rollbar = require('rollbar');
const rollbar = new Rollbar( {
    accessToken: 'f6fcd322cca041139739f21ce8ca9d33',
    captureUncaught: true,
    captureUnhandledRejections: true
});
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

const port = process.env.PORT || 4400;

app.listen(port, () => { console.log(`Server is up on ${port}.`)})