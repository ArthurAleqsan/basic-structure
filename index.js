const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_USER_URL = process.env.API_USER_URL || 'https://users-test.godssides.com/api/v1';
const API_AUTH_URL = process.env.API_AUTH_URL || 'https://auth-test.godssides.com/api/v1';
const API_MEDIA_URL = process.env.API_MEDIA_URL || 'https://media-test.godssides.com/api/v1/media';
const API_POSTS_URL = process.env.API_POSTS_URL ||  'https://posts-test.godssides.com/api/v1';
const API_ANNOUNCEMENTS_URL = process.env.API_ANNOUNCEMENTS_URL ||  'https://posts-test.godssides.com/api/v1';
// const API_ANNOUNCEMENTS_URL = 'http://localhost:3000/announcements';
const PLACES = 'https://maps.googleapis.com/maps/api';

const page = require('./page/');

// app.use('/api', function(req,res) {
//     //modify the url in any way you want
//     request(API_USER_URL).pipe(res);
// });

app.use('/api/', proxy({target: API_USER_URL, changeOrigin: true, pathRewrite: {'^/api': '/'}}));
app.use('/oauth', proxy({target: API_AUTH_URL, changeOrigin: true, pathRewrite: {'^/oauth': '/'}}));
// app.use('/posts', proxy({target: API_POSTS_URL, changeOrigin: true, pathRewrite: {'^/posts': '/'}}));

app.use('/announcements', (req, res, next) => {
    // console.log('post');
    next();
}, proxy({target: API_ANNOUNCEMENTS_URL, changeOrigin: true},onError));

app.use('/upload',(req, res, next) => {
    // console.log('upload');
    next()
},  proxy({target: API_MEDIA_URL, changeOrigin: true,},onError));
app.use('/places', (req, res, next) => {
    // console.log(req.url);
    next()
}, proxy({target: PLACES, changeOrigin: true, pathRewrite: {'^/places': '/'}}));


app.use('/public', express.static('public'));
app.use('/locales', express.static('locales'));
app.use('/assets', express.static('assets'));


app.use(async (req, res, next) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

//app.use(express.static('public'));


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
