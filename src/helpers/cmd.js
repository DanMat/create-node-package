import { promisify } from 'util';
import { exec } from 'child_process';

const promisifyExec = promisify(exec);

export const execute = async (command, args = []) => {
	try {
		const { stdout } = await promisifyExec(`${command} ${args.join(' ')}`);
		return stdout.trim();
	} catch (e) {
		throw new Error(e.toString());
	}
};