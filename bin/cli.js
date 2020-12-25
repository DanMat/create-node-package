import { runCLI } from '../src';

runCLI(process.argv).catch(err => {
	console.error(err);
	process.exit(1);
});
