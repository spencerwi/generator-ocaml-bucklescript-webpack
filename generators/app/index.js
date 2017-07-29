var Generator = require("yeoman-generator");

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.userInput = null;
    }

    prompting() {
        return this.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message:' Your project name',
                    default: this.appname
                },
                {
                    type: 'list',
                    name: 'syntaxChoice',
                    choices: ['ocaml', 'reason'],
                    message: 'Which syntax would you like to use?',
                    default: 'ocaml'
                }
        ]).then((answers) => {
            this.userInput = answers;
        });
    }

    writing() {
        this.fs.copyTpl(
                this.templatePath('package.json'),
                this.destinationPath('package.json'),
                {projectName: this.userInput.name}
        );
        this.fs.copyTpl(
                this.templatePath('bsconfig.json'),
                this.destinationPath('bsconfig.json'),
                {projectName: this.userInput.name}
        );
        let fileExt = '';
        if (this.userInput.syntaxChoice == 'reason'){
            fileExt = 're';
            this.fs.copyTpl(
                this.templatePath('src/main.re'),
                this.destinationPath('src/main.re')
            );
        } else {
            fileExt = 'ml';
            this.fs.copyTpl(
                this.templatePath('src/main.ml'),
                this.destinationPath('src/main.ml')
            );
        }
        this.fs.copyTpl(
                this.templatePath('webpack.config.js'),
                this.destinationPath('webpack.config.js'),
                {
                    projectName: this.userInput.name,
                    fileExt
                }
        );
        this.fs.copyTpl(
                this.templatePath('release/index.html'),
                this.destinationPath('release/index.html'),
                {projectName: this.userInput.name}
        );

        this.npmInstall(['bs-platform', 'bs-loader', 'webpack'], { 'save-dev': true });
    }
};
