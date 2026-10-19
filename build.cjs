const fs = require('node:fs');
const path = require('node:path');
const babel = require('./vendor/babel.cjs');
const source = fs.readFileSync(path.join(__dirname, 'app.jsx'), 'utf8');
const output = babel.transform(source, { presets: ['react'], comments: false, compact: false }).code;
fs.writeFileSync(path.join(__dirname, 'app.js'), output + '\n', 'utf8');
console.log('Compiled app.jsx → app.js');
