#!/usr/bin/env node

const prompts = require('prompts');
const mkdirp = require('mkdirp')
const chalk = require('chalk');

const { questions } = require('./src/questions');

const [,, ...args] = process.argv;
const [folderName] = args;


const runCLI = async () => {
	if(!folderName) {
		console.log(chalk.red('Specify folder name to generate the template files'));
		process.exit(1);
	}
	const makeProjectDir = mkdirp.sync(`./${folderName}`);
	if(!makeProjectDir) {
		console.log(chalk.red(`Folder ${chalk.bold(folderName)} already exists!!`));
		process.exit(1);
	}

	console.info(chalk.blue.bold('\nNode Package Generator'));
	console.log(chalk.italic('Press enter if the default value is the same\n'));

	const { projectName } = await prompts([{
		type: 'text',
		name: 'projectName',
		message: 'The name of your project?',
		initial: folderName
	}]);
	const response = await prompts(questions);
	console.log(projectName, response)
}

runCLI().catch(err => {
	console.error(err);
	process.exit(1);
});