"format cjs";

var wrap = require('word-wrap');
var map = require('lodash.map');
var longest = require('longest');
var rightPad = require('right-pad');

var filter = function(array) {
  return array.filter(function(x) {
    return x;
  });
};

// This can be any kind of SystemJS compatible module.
// We use Commonjs here, but ES6 or AMD would do just
// fine.
module.exports = function (options) {
  var types = options.types;

  var length = longest(Object.keys(types)).length + 1;
  var choices = map(types, function (type, key) {
    return {
      name: rightPad(key + ':', length) + ' ' + type.description,
      value: key
    };
  });

  return {
    // When a user runs `git cz`, prompter will
    // be executed. We pass you cz, which currently
    // is just an instance of inquirer.js. Using
    // this you can ask questions and get answers.
    //
    // The commit callback should be executed when
    // you're ready to send back a commit template
    // to git.
    //
    // By default, we'll de-indent your commit
    // template and will keep empty lines.
    prompter: function(cz, commit) {
      console.log('\nA linha 1 pode conter no máximo 100 caracteres. Todas as outras linhas serão recortadas após 100 caracters.\n');

      // Perguntas ao usuário para que a mensagem de commit possa ser criada
      // Ver inquirer.js para documentação específica de quais tipos de perguntas podem ser feitas
      cz.prompt([
        {
          type: 'list',
          name: 'type',
          message: 'Selecione o tipo de mudança que está sendo feita no commit:',
          choices: choices
        }, {
          type: 'input',
          name: 'scope',
          message: 'Indique o escopo dessa mudança ($localização, $browser, $compilação, etc.):\n'
        }, {
          type: 'input',
          name: 'subject',
          message: 'Escreva uma descrição pequena e suscinta das mudanças:\n'
        }, {
          type: 'input',
          name: 'body',
          message: 'Escreva uma maior descrição das mudanças:\n'
        }, {
          type: 'input',
          name: 'breaking',
          message: 'Liste se houver mudanças que podem quebrar versões anteriores:\n'
        }, {
          type: 'input',
          name: 'issues',
          message: 'Liste os issues resolvidos por essa mudança:\n'
        }
      ]).then(function(answers) {

        var maxLineWidth = 100;

        var wrapOptions = {
          trim: true,
          newline: '\n',
          indent:'',
          width: maxLineWidth
        };

        // Parêntesis só são necessários quando houver um escopo informado
        var scope = answers.scope.trim();
        scope = scope ? '(' + answers.scope.trim() + ')' : '';

        // Recortar a linha inicial caso ela possua mais de 100 caracteres
        var head = (answers.type + scope + ': ' + answers.subject.trim()).slice(0, maxLineWidth);

        // Wrap these lines at 100 characters
        // Como raios se traduz wrapped lines?
        var body = wrap(answers.body, wrapOptions);

        // Adiciona o prefixo de breaking changes, removendo o mesmo se já estiver presente
        var breaking = answers.breaking.trim();
        breaking = breaking ? 'BREAKING CHANGE: ' + breaking.replace(/^BREAKING CHANGE: /, '') : '';
        breaking = wrap(breaking, wrapOptions);

        var issues = wrap(answers.issues, wrapOptions);

        var footer = filter([ breaking, issues ]).join('\n\n');

        commit(head + '\n\n' + body + '\n\n' + footer);
      });
    }
  };
};
