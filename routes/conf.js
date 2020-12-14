var fs = require('fs');
const path = require('path');
const YAML = require('yamljs');
var conf = YAML.parse(fs.readFileSync('./data/conf.yaml').toString());

module.exports = conf;