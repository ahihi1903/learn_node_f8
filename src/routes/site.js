var express = require('express');
var router = express.Router();

const siteController = require('../app/controllers/SiteController');

//tạo sau pk cho lên trc để load qua

router.use('/search', siteController.search);

router.use('/', siteController.index);

module.exports = router;
