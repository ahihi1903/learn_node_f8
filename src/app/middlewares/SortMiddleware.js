module.exports = function SortMiddleware(req, res, next) {

    res.locals._sort = {
        enabled: false,
        type: 'default'
    };

    // 🔥 Sửa ở đây: dùng Object.prototype.hasOwnProperty.call
    if (Object.prototype.hasOwnProperty.call(req.query, '_sort')) {
        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column,
        });
    }

    next();
};
