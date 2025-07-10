const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars');
const morgan = require('morgan')
const app = express()
const port = 8080

app.use(express.static(path.join(__dirname, 'public')))

//template engine
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));
//HTTP logger
app.use(morgan('combined'))


//route
app.get('/', (req, res) => {
  res.render('home');
})

app.get('/new', (req, res) => {
  res.render('new');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
