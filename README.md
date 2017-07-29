# cz-ptbr-changelog
[![travis build status](https://img.shields.io/travis/tibuurcio/cz-ptbr-changelog.svg)](https://travis-ci.org/tibuurcio/cz-ptbr-changelog)
[![npm version](https://img.shields.io/npm/v/cz-ptbr-changelog.svg)](https://www.npmjs.com/package/cz-ptbr-changelog)
![MIT license](https://img.shields.io/npm/l/cz-ptbr-changelog.svg)

Commitizen adapter para projetos escritos em pt-BR que seguem o formato conventional-changelog. 

Commitizen é uma interface de linha de comando para auxiliar a criar mensagens para seus commits seguindo um padrão predefinido. Este projeto é um padrão traduzido para pt-BR do [padrão seguido pelo AngularJS].

Para utilizar esse padrão em seu projeto, tenha certeza de ter o commitizen instalado globalmente:

`npm install commitizen -g`

Em seguida, inicialize o commitizen com este projeto como convenção de mensagens:

`commitizen init cz-ptbr-changelog --save-dev --save-exact`

Quando for commitar alterações, basta utilizar o comando `git cz`.

![git cz output](http://imgur.com/a/y0HUW)

Para mais informações, ver [commitizen](https://github.com/commitizen/cz-cli).

## License

MIT © Gabriel Tibúrcio
