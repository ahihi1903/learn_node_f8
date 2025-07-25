const express = require('express');
const path = require('path');

const methodOverride = require('method-override');
const morgan = require('morgan');

// 👉 Dùng engine từ express-handlebars
const { engine } = require('express-handlebars');
// 👉 Import Handlebars gốc để dùng SafeString
const Handlebars = require('handlebars');

const app = express();
const port = 8080;

const SortMiddleware = require('./app/middlewares/SortMiddleware');
const routes = require('./routes');
const db = require('./config/db');

// Connect DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(SortMiddleware);

app.engine(
  'handlebars',
  engine({
    extname: '.handlebars',
    helpers: {
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

        const html = `
          <a href="?_sort&column=${field}&type=${type}">
            <i class="${icon}"></i>
          </a>
        `;

        // 👇👇 QUAN TRỌNG: bọc bằng SafeString
        return new Handlebars.SafeString(html);
      },

    },
    partialsDir: path.join(__dirname, 'resources', 'views', 'partials'),

  }),
);

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(morgan('combined'));
routes(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
