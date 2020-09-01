require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

nunjucks.configure('src/module', {
  autoescape: true,
  express: app,
});

app.get('/', (req, res) => {
  res.render('view/layout/index.html');
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
