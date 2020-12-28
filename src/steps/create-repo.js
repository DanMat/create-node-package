const { Listr } = require('listr2');

const { execute } = require('../helpers/cmd');

module.exports = async () => {
	let repoName;

	const task = new Listr([
		{
			title: "Let's start creating a github repository for our template.",
			task: async (_ctx, subTask) => {
				const prompts = await subTask.prompt([
					{
						type: 'input',
						name: 'gitRepoName',
						message: 'Github repository name',
						validate: async str => {
							try {
								const a = await execute('gh', [
									'repo',
									'create',
									str,
									'--public',
									'-y'
								]);
								console.log(a);
								return true;
							} catch (e) {
								return e.toString();
							}
						}
					}
				]);
				repoName = prompts.gitRepoName;
			}
		}
	]);

	await task.run();

	return repoName;
};
