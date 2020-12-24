const Generator = require('yeoman-generator');
const fs = require('fs');

module.exports = class extends Generator {
	constructor(args, options) {
		super(args, options);
		this.log('Initializing the generator...');
	}

	writing() {
		const {
			templateName,
			projectFolder,
			packageName,
			packageDescription,
			authorName,
			packageReference
		} = this.options;
		const pathToTemplate = `${__dirname}/template/${templateName}`;

		this.destinationRoot(projectFolder);
		this.log('Generating template...');

		this.fs.copyTpl(this.templatePath(pathToTemplate), this.destinationRoot(), {
			packageName,
			packageDescription,
			authorName,
			packageReference
		});

		// Copy all dotfiles
		this.fs.copy(this.templatePath(pathToTemplate), this.destinationRoot(), {}, {}, {globOptions: {ignore:".git"}});

		this.fs.move(this.destinationPath('_gitignore'), this.destinationPath('.gitignore'));
		this.fs.move(this.destinationPath('_package.json'), this.destinationPath('package.json'));

	}

	end() {
		this.log('Your template has been created.')
	}
}