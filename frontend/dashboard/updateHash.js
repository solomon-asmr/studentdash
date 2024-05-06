const fs = require('fs');

const buildDir = './build';
const cssFileName = fs.readdirSync(`${buildDir}/static/css`)[0];
const jsFileName = fs.readdirSync(`${buildDir}/static/js`)[0];

let html = fs.readFileSync('C:/Users/orbar/Desktop/exlab/StudentDash/xampp/server/moodle/local/studentdash/templates/dashboard.mustache', 'utf8');

html = html.replace(/\/static\/css\/main\..*?\.css/, `/static/css/${cssFileName}`);
html = html.replace(/\/static\/js\/main\..*?\.js/, `/static/js/${jsFileName}`);

fs.writeFileSync('C:/Users/orbar/Desktop/exlab/StudentDash/xampp/server/moodle/local/studentdash/templates/dashboard.mustache', html);

