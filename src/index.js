const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const port = 8080;

const routes = require('./routes/index');
const db = require('./config/db/index');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
//template engine
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));
//HTTP logger
app.use(morgan('combined'));

//routes init

routes(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
