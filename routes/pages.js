// non-api, front-end pages
const router = require('express').Router();
const path = require('path') // read and send html page/

router.get('/', (_, res) => {
    res.redirect('/home'); // redirect to homepage

});

router.get('/home', (_, res) => {  // send file to homepage
    res.sendFile(path.resolve('client/index.html'));
});


module.exports = router;
