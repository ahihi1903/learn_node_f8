var express = require('express');
var router = express.Router();

const siteController = require('../app/controllers/SiteController');

//tạo sau pk cho lên trc để load qua

router.get('/search', siteController.search);

router.get('/', siteController.index);

module.exports = router;
//f8
//git okey
// mongodb sơ
