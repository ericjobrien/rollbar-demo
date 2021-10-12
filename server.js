const express = require('express')
const path = require('path');
const Rollbar = require('rollbar');
const rollbar = new Rollbar( {
    accessToken: 'd01a8fd4a27e49f38d7105e5cd66a4a2',
    captureUncaught: true,
    captureUnhandledRejections: true
})
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

const port = process.env.PORT || 4400;

app.listen(port, () => { console.log(`Server is up on ${port}.`)})