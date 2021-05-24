const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const urlencodeParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

//Чтение из файла
const file = fs.readFileSync('pizzas.json', 'utf8');
const database = JSON.parse(file);

const file2 = fs.readFileSync('template.json', 'utf8');
const template = JSON.parse(file2);

const file3 = fs.readFileSync('feedback.json', 'utf8');
const otziv = JSON.parse(file3);

//Форма заказа
app.post('/add', urlencodeParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  const jsonData = fs.readFileSync('template.json', 'utf8');
  const all =
    jsonData.substring(0, jsonData.length - 1) +
    ', ' +
    JSON.stringify(req.body) +
    ']';

  fs.writeFileSync('template.json', all, function (error) {
    if (error) throw error;
    console.log('Асинхронная запись файла завершена.');
  });

  res.render('view', { data: database });
});

app.get('/', function (req, res) {
  res.render('add', { data: database });
});

//Отзывы
app.post('/view', urlencodeParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  const jsonData2 = fs.readFileSync('feedback.json', 'utf8');
  const all2 =
    jsonData2.substring(0, jsonData2.length - 1) +
    ', ' +
    JSON.stringify(req.body) +
    ']';

  fs.writeFileSync('feedback.json', all2, function (error) {
    if (error) throw error;
    console.log('Асинхронная запись файла завершена.');
  });
  res.render('add', { data: database });
});

app.get('/', function (req, res) {
  res.render('view', { data: database });
});

//Сервер
app.listen(3000);
