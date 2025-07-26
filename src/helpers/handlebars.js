const Handlebars = require('handlebars');
const path = require('path');

module.exports = {
    sum: (a, b) => a + b,
    
    sortable: (field, sort) => {
        if (!sort || !sort.column) {
            sort = { column: null, type: 'default' };
        }

        const sortType = field === sort.column ? sort.type : 'default';
        const icons = {
            default: 'bi bi-chevron-bar-expand',
            asc: 'bi bi-sort-down-alt',
            desc: 'bi bi-sort-down',
        };
        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        };

        const icon = icons[sortType];
        const type = types[sortType];

        const href= Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`);

        const html = `
            <a href="${href}">
            <i class="${icon}"></i>
            </a>
        `;

        // 👇👇 QUAN TRỌNG: bọc bằng SafeString
        return new Handlebars.SafeString(html);
        
    },

    
    partialsDir: path.join(__dirname, 'resources', 'views', 'partials'),

};