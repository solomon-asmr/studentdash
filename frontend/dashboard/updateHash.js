const fs = require('fs');

const cssFileName = fs.readdirSync(`./build/static/css`)[0];
const jsFileName = fs.readdirSync(`./build/static/js`)[0];
const templateURL = 'C:/Users/orbar/Desktop/exlab/StudentDash/xampp/server/moodle/local/studentdash/templates/dashboard.mustache';
let html = fs.readFileSync(templateURL, 'utf8');

html = html.replace(/\/static\/css\/main\..*?\.css/, `/static/css/${cssFileName}`);
html = html.replace(/\/static\/js\/main\..*?\.js/, `/static/js/${jsFileName}`);

fs.writeFileSync(templateURL, html);

