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

	await prerequisite.run();

	if (!npmToken) {
		npmToken = await getUsersNPMToken();
	}

	const repoName = await createGithubRepo();

	console.log(npmToken, repoName);
};
