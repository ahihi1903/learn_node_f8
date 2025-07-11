const newRouter = require('./news');
const siteRouter = require('./site');

function routes(app) {
  
    // app.get('/search', (req, res) => {
    //     res.render('search');
    // }

    // app.get('/new', (req, res) => {
    //     res.render('new');
    // })
    app.use('/news', newRouter);

    // app.get('/', (req, res) => {
    //     res.render('home');
    // })
    app.use('/', siteRouter);
   
}

module.exports = routes;
