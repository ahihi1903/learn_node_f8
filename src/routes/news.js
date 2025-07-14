var express = require('express');
var router = express.Router();

const newController = require('../app/controllers/NewController');

//newController.index
//tạo sau pk cho lên trc để load qua

router.get('/:slug', newController.show);

router.get('/', newController.index);

module.exports = router;
