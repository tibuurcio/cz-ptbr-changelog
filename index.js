"format cjs";

var engine = require('./engine');
var conventionalCommitTypes = require('./tipos-commit-ptbr.json');

module.exports = engine({
  types: conventionalCommitTypes.types
});
