const express = require('express');
const path = require('path');
const Rollbar = require('rollbar');

const rollbar = new Rollbar( {
    accessToken: 'f6fcd322cca041139739f21ce8ca9d33',
    captureUncaught: true,
    captureUnhandledRejections: true
});
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    rollbar.info('html file server successfully');
});

let students = [];

app.post('/api/student', (req, res) => {
    let { name } = req.body;
    name = name.trim();

    students.push(name);

    rollbar.log('student added sucessfully', {author: 'Dj', type: 'manual entry'});
    res.status(200).send(students);
})

app.use(rollbar.errorHandler());
const port = process.env.PORT || 4400;

app.listen(port, () => { console.log(`Server is up on ${port}.`)})