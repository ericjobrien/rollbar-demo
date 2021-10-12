const express = require('express');
const path = require('path');
const Rollbar = require('rollbar');

const rollbar = new Rollbar( {
    accessToken: 'f6fcd322cca041139739f21ce8ca9d33',
    captureUncaught: true,
    captureUnhandledRejections: true
});
const app = express();


//set middleware to parse express calls into json
app.use(express.json());

//middleware to access css file
app.use('/style', express.static(path.join(__dirname, './public/styles.css')));

//middleware to access html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    rollbar.info('html file server successfully');
});


//following is code to capture student names that are inputed on the webpage
//student names are posted back onto the webpage as new elements
//code in place to handle cases such as if someone doesn't enter a name
let students = [];

app.post('/api/student', (req, res) => {
    let { name } = req.body;
    name = name.trim();

    const index = students.findIndex(studentName=> studentName === name)

    if(index === -1 && name !== ''){
        students.push(name)
        rollbar.log('Student added successfully', {author: 'Jim', type: 'manual'})
        res.status(200).send(students)
    } else if (name === ''){
        rollbar.error('No name given')
        res.status(400).send('must provide a name.')
    } else {
        rollbar.error('student already exists')
        res.status(400).send('that student already exists')
    }

})


//middleware to throw an error message to rollbar
app.use(rollbar.errorHandler());

const port = process.env.PORT || 4400;

app.listen(port, () => { console.log(`Server is up on ${port}.`)})