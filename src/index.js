import yargs from 'yargs';

import { VERBIAGE } from './constants';

export const runCLI = async _args => {
	const options = yargs.usage('Usage: -n <name>').option('n', {
		alias: 'name',
		describe: 'Your name',
		type: 'string',
		demandOption: true
	}).argv;

	console.log(`Hello, ${options.name}. ${VERBIAGE}`);
};
