const fs = require('fs');

const cssFileName = fs.readdirSync(`./build/static/css`)[0];
const jsFileName = fs.readdirSync(`./build/static/js`)[0];
const templateURL = 'C:/Users/Lenovo/Downloads/MoodleWindowsInstaller-latest-403/server/moodle/local/studentdash/templates/dashboard.mustache';
let template = fs.readFileSync(templateURL, 'utf8');

template = template.replace(/\/static\/css\/main\..*?\.css/, `/static/css/${cssFileName}`);
template = template.replace(/\/static\/js\/main\..*?\.js/, `/static/js/${jsFileName}`);

fs.writeFileSync(templateURL, template);

