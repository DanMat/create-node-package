import figlet from 'figlet';
import { Command } from 'commander';

import prerequisite from './steps/prerequisite';
import getUsersNPMToken from './steps/npmtoken';

const LOGO = 'CREATE DEPLOY NODE PACKAGES';
const FONT_STYLE = 'contessa';

export const runCLI = async args => {
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

	console.log(npmToken);
};