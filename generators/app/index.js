var Generator = require("yeoman-generator");

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.projectName = null;
    }

    prompting() {
        return this.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message:' Your project name',
                    default: this.appname
                }
        ]).then((answers) => {
            this.projectName = answers.name;
        });
    }

    writing() {
        this.fs.copyTpl(
                this.templatePath('package.json'),
                this.destinationPath('package.json'),
                {projectName: this.projectName}
        );
        this.fs.copyTpl(
                this.templatePath('bsconfig.json'),
                this.destinationPath('bsconfig.json'),
                {projectName: this.projectName}
        );
        this.fs.copyTpl(
                this.templatePath('webpack.config.js'),
                this.destinationPath('webpack.config.js'),
                {projectName: this.projectName}
        );
        this.fs.copyTpl(
                this.templatePath('src/main.ml'),
                this.destinationPath('src/main.ml')
        );
        this.fs.copyTpl(
                this.templatePath('release/index.html'),
                this.destinationPath('release/index.html'),
                {projectName: this.projectName}
        );

        this.npmInstall(['bs-platform', 'bs-loader', 'webpack'], { 'save-dev': true });
    }
};
