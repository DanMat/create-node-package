const figlet = require('figlet');
const { Command } = require('commander');

const prerequisite = require('./steps/prerequisite');
const getUsersNPMToken = require('./steps/npm-token');
const createGithubRepo = require('./steps/create-repo');

const LOGO = 'CREATE DEPLOY NODE PACKAGES';
const FONT_STYLE = 'contessa';

module.exports.runCLI = async args => {
	console.log(figlet.textSync(LOGO, FONT_STYLE));

	const command = new Command();
	command.option(
		'-n, --npm_token <token>',
		'Create a NPM token using this doc https://docs.npmjs.com/creating-and-viewing-access-tokens'
	);
	command.parse(args);

	let { npm_token: npmToken } = command.opts();

	console.log('\nChecking prerequisites to install the template\n');
	await prerequisite.run();

	if (!npmToken) {
		console.log(
			"\nLet's generate a NPM token. Which we will use to publish your package.\n"
		);
		npmToken = (await getUsersNPMToken.run()).token;
	}

	console.log("\nLet's start creating a github repository for our template.\n");
	const repoName = (await createGithubRepo.run()).gitRepoUrl;

	console.log(npmToken, repoName);
};
