const fs = require('fs');
const file2 = fs.readFileSync('template.json', 'utf8');
const template1 = JSON.parse(file2);
const file3 = fs.readFileSync('feedback.json', 'utf8');
const otziv = JSON.parse(file3);
