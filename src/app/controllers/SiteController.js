const Course = require('../models/Course');


class SiteController {
    //get /
    // index(req, res) {

    //     Course.find({}, function(err, courses) {
    //         if(!err){
    //             res.json(courses);
                
    //         } 
    //         else{
    //             res.status(400).json({error: 'ERROR!!!'});

    //         }
    //     });


    //     //res.render('home');
    // }

    // Đảm bảo hàm controller là async
    async index(req, res) {
        try {
            const courses = await Course.find({});
            res.json(courses); // Hoặc bạn có thể dùng res.render('home', { courses }) nếu dùng template
        } catch (err) {
            res.status(400).json({ error: 'Lỗi khi lấy dữ liệu' });
        }
    }



    //get /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
