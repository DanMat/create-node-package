import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';
import { VERBIAGE } from '../constants';

const promisifyExec = promisify(exec);

const cli = args =>
	promisifyExec(`node -r esm ${path.resolve('./bin/cli')} ${args.join(' ')}`);

test('Check the verbiage when a name is passed', async () => {
	const name = 'Dan';
	const { stdout } = await cli(['-n', name]);
	expect(stdout).toEqual(`Hello, ${name}. ${VERBIAGE}\n`);
});

test('Returns an error code 1 with no arg', async () => {
	try {
		await cli([]);
	} catch ({ code }) {
		expect(code).toBe(1);
	}
});
