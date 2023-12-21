require('dotenv').config();
const express = require('express')
const app = express()
const path = require('path');
const fs = require('fs')

app.use(express.urlencoded({ extended: true }))

app.engine('html', (filePath, options, callback) => { // define the template engine
    fs.readFile(filePath, (err, content) => {
        // this is an extremely simple template engine
        const rendered = content.toString()
            .replace('{{phone}}', `${options.phone}`)
            .replace('{{email}}', `${options.email}`)
            .replace('{{name}}', `${options.name}`)
            .replace('{{attend}}', `${options.attend}`)

        return callback(null, rendered)
    })
})

app.set('views', './views') // specify the views directory
app.set('view engine', 'html') // register the template engine

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/home.html'));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/register.html'));
})

app.get('/confirm', (req, res) => {
    const name = req.query.fullname;
    const email = req.query.email
    const phone = req.query.phone
    const attend = req.query.attend

    res.render('confirm', {name, email, phone, attend});
})
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server listening on ${port}`);
})