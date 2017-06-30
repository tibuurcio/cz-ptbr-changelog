"format cjs";

var engine = require('./engine');
var tipos = require('./tipos-commit-ptbr');

module.exports = engine({
  types: tipos
});
