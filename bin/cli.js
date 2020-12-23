#!/usr/bin/env node

const prompts = require('prompts');
const chalk = require('chalk');


const { questions } = require('./src/questions');
const { createProjectDir, isPackageNameValid } = require('./src/packageNameHelper');

const [,, ...args] = process.argv;
const [folderName] = args;


const runCLI = async () => {
	if(!folderName) {
		console.log(chalk.red('Specify folder name to generate the template files'));
		process.exit(1);
	}

	if(!createProjectDir(folderName)) {
		console.log(chalk.red(`Folder ${chalk.bold(folderName)} already exists!!`));
		process.exit(1);
	}

	console.info(chalk.blue.bold('\nNode Package Generator'));
	console.log(chalk.italic('Press enter if the default value is the same\n'));

	let validPackageName = false;
	let projectName;

	while(!validPackageName) {
		const userInputPkg = await prompts([{
			type: 'text',
			name: 'name',
			message: 'The name of your npm module?'
		}]);
		
		validPackageName = await isPackageNameValid(userInputPkg.name);
		if(validPackageName) {
			projectName = userInputPkg.name;
		} else {
			console.error(chalk.red("The package name is either taken or is not a valid format"))
		}
	}

	const response = await prompts(questions);
	console.log(projectName, response)
}

runCLI().catch(err => {
	console.error(err);
	process.exit(1);
});