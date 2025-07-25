const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../utill/mongoose');

class MeController {
    //get /me/stored/courses
    storedCourses(req, res, next) {
        

        let courseQuery = Course.find({});

        if (Object.prototype.hasOwnProperty.call(req.query, '_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            });
        }
        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                    _sort: res.locals._sort,
                })
            )
            .catch(next);

      
    }



    //get /me/trash/courses


    trashCourses(req, res, next) {
        Course.findDeleted({deletedAt: { $ne: null }})
            .then(courses => {
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses)
                });
            })
            .catch(next);
    }
}
module.exports = new MeController();