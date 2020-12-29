const { promisify } = require('util');
const { exec } = require('child_process');

const promisifyExec = promisify(exec);

module.exports.execute = async (command, args = []) => {
	const { stdout } = await promisifyExec(`${command} ${args.join(' ')}`);
	return stdout.trim();
};
