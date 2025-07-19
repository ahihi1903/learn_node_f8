const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../utill/mongoose');

class SiteController {
    // Đảm bảo hàm controller là async
    // async index(req, res) {
    //     try {
    //         const courses = await Course.find({});
    //         res.json(courses); // Hoặc bạn có thể dùng res.render('home', { courses }) nếu dùng template
    //     } catch (err) {
    //         res.status(400).json({ error: 'Lỗi khi lấy dữ liệu' });
    //     }
    // }
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    //get /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();