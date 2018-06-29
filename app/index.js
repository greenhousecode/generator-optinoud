const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }

  prompting() {
    this.log(yosay(`Welcome to the\n${chalk.blue('Optinoud')} generator!`));

    return this.prompt([{
      name: 'website',
      message: 'What is the website you want to run your code on?',
      default: 'https://www.example.com/',
    }]).then((answers) => {
      this.props = answers;
    });
  }

  copyHiddenfiles() {
    const hiddenFiles = ['.gitignore'];
    hiddenFiles.forEach(hiddenFile => this.fs.copyTpl(this.templatePath(hiddenFile),
      this.destinationPath(hiddenFile), this.props));
  }

  writing() {
    this.fs.copyTpl(this.templatePath('.'), this.destinationPath('.'), this.props);
  }

  install() {
    this.npmInstall();
  }

  end() {
    this.log(yosay(`${chalk.blue('Optinoud')} has finished installing.\n\nRun ${chalk.green('npm start')} and edit ${chalk.white('src/default.js')} to get started!`));
  }
};
