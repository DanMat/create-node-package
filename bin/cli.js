#!/usr/bin/env node

const prompts = require('prompts');
const chalk = require('chalk');


const { questions } = require('../src/questions');
const {  isProjectDirValid, createProjectDir, isPackageNameValid } = require('../src/pkgFolderNameHelper');

const runCLI = async () => {
	console.info(chalk.blue.bold('\nNode Package Generator'));
	console.log(chalk.italic('Let\'s get started by creating a new local folder for your template.\n'));

	let validFolderName = false;
	while(!validFolderName) {
		const { userInputFolderName } = await prompts([{
			type: 'text',
			name: 'userInputFolderName',
			message: 'Enter the name of the folder you would like to create for this template'
		}]);
		validFolderName = await isProjectDirValid(userInputFolderName);

		if(validFolderName) {
			createProjectDir(userInputFolderName);
		} else {
			console.error(chalk.red(`'${userInputFolderName}' folder already exists.`))
		}
	}

	let validPackageName = false;
	let packageName;

	while(!validPackageName) {
		const { userInputPkgName } = await prompts([{
			type: 'text',
			name: 'userInputPkgName',
			message: 'Enter a name for this package'
		}]);
		
		let errorMessage = "The package name is either taken or is not a valid format";
		try {
			validPackageName = await isPackageNameValid(userInputPkgName);
		} catch(e) {
			errorMessage = e.toString()
		}
		
		if(validPackageName) {
			packageName = userInputPkgName;
		} else {
			console.error(chalk.red(errorMessage));
		}
	}

	const response = await prompts(questions);
	console.log({packageName, ...response})
}

runCLI().catch(err => {
	console.error(err);
	process.exit(1);
});