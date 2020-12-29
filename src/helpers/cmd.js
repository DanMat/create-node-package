const { promisify } = require('util');
const { exec } = require('child_process');

const promisifyExec = promisify(exec);

const execute = async (command, args = []) => {
	const { stdout } = await promisifyExec(`${command} ${args.join(' ')}`);
	return stdout.trim();
};

module.exports.execute = execute;
module.exports.executeInRepo = async (repoName, command, args = []) => {
	await promisifyExec(`cd ${repoName}`);
	const response = await execute(command, args);
	return response;
};
