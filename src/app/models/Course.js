const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        _id: { type: Number, },
        name: { type: String, required: true },
        description: { type: String, maxLength: 600 },
        img: { type: String },
        videoID: { type: String, required: true },
        slug: { type: String, slug: 'name'}, //, unique: true 
    },
    {
        _id: false,
        timestamps: true,
    },
);

//custom query helpers
CourseSchema.query.sortable = function(req){
    if (Object.prototype.hasOwnProperty.call(req.query, '_sort')) {
        const isValidtype = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidtype ? req.query.type : 'desc',
        });
    }
    return this;
}

//add plugins
mongoose.plugin(slug);

CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', CourseSchema);
