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
      message: 'What is the website URL you want to run your code on?',
      validate: answer => (answer && /^https?:\/\/[^.]+\.[^.]+/.test(answer))
        || `Please enter a valid URL, e.g. ${chalk.green('https://www.example.com/optional/page.html')}`,
    }]).then((answers) => {
      this.props = answers;
    });
  }

  writing() {
    this.fs.write(this.destinationPath('.gitignore'), 'node_modules\n');
    this.fs.copyTpl(this.templatePath('.'), this.destinationPath('.'), this.props);
  }

  install() {
    this.npmInstall();
  }

  end() {
    this.spawnCommandSync('clear');
    this.log(yosay(`${chalk.blue('Optinoud')} has finished installing.\n\nRun ${chalk.green('npm start')} and edit ${chalk.white('src/variant.js')} to get started!`));
  }
};
