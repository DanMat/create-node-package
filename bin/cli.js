#!/usr/bin/env node

const prompts = require('prompts');
const chalk = require('chalk');


const { questions } = require('./src/questions');
const {  isProjectDirValid, createProjectDir, isPackageNameValid } = require('./src/pkgFolderNameHelper');

const runCLI = async () => {
	console.info(chalk.blue.bold('\nNode Package Generator'));
	console.log(chalk.italic('Let\'s get started by creating a new local folder for your template.\n'));

	let validFolderName = false;
	while(!validFolderName) {
		const userInputFolder = await prompts([{
			type: 'text',
			name: 'name',
			message: 'The name of local folder you would like to create'
		}]);
		validFolderName = await isProjectDirValid(userInputFolder.name);

		if(validFolderName) {
			createProjectDir(userInputFolder.name);
		} else {
			console.error(chalk.red(`'${userInputFolder.name}' folder already exists.`))
		}
	}

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