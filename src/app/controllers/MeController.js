const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../utill/mongoose');

class MeController {
    //get /me/stored/courses
    storedCourses(req, res, next) {

        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                })
            )
            .catch(next);

        // Course.countDocumentsDeleted()
        //     .then((deletedCount) => {
        //         console.log(deletedCount);
        //     })


        // Course.find({})
        //     .then((courses) =>
        //         res.render('me/stored-courses', {
        //             courses: mutipleMongooseToObject(courses),
        //         }),
        //     )
        //     .catch(next);
    }



    //get /me/trash/courses

    // trashCourses(req, res, next) {
    //     console.log('>>> has findDeleted method?', typeof Course.findDeleted);
    //     Course.findDeleted({ deletedAt: { $ne: null }  })
    //         .then(courses => {
    //             console.log('📌 Courses in trash (after filter):', courses);
    //             res.render('me/trash-courses', {
    //                 courses: mutipleMongooseToObject(courses)
    //             });
    //         })
    //         .catch(next);

    // }


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