const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {zd: 'Hello world'});
});


module.exports = router;