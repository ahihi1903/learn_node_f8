var express = require('express');
var router = express.Router();

const courseController = require('../app/controllers/CourseController');

//newController.index
//tạo sau pk cho lên trc để load qua

router.get('/:slug', courseController.show);


module.exports = router;
