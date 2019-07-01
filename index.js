const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.use('/public', express.static('public'));
app.use('/locales', express.static('locales'));
app.use('/assets', express.static('assets'));


app.use(async (req, res, next) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});


function onError(err, req, res) {
    console.log(err, req, res)
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    })
    res.end(
        'Something went wrong. And we are reporting a custom error message.'
    )
}
