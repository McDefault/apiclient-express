const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
let app = express();
let apiRouterPark = require('./apis/pledges');
let patreonAuthMiddleware = require('./middleware/patreonAuth');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// middleware
// app.use(performanceMiddleware);
app.use(bodyParser({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/pledges', patreonAuthMiddleware);

app.use('/api/pledges', apiRouterPark);

app.get('/api/reset', (req, res, next) => {
    res.send('restarting!');
    res.status(201);
    res.end();
    console.log("restarting");
    process.exit(1);

});
app.listen(1337);