const { Listr } = require('listr2');
const ListrError = require('../helpers/custom-error');

const { execute } = require('../helpers/cmd');

module.exports = new Listr([
	{
		title: 'Github Information',
		task: async (ctx, opt) => {
			ctx.gitRepoName = (
				await opt.prompt([
					{
						type: 'input',
						name: 'gitRepoName',
						message: 'Name for your repository',
						validate: async str => {
							try {
								ctx.gitRepoUrl = await execute('gh', [
									'repo',
									'create',
									str,
									'--public'
								]);
								return true;
							} catch (e) {
								throw new ListrError(e.message);
							}
						}
					}
				])
			).gitRepoName;
		},
		options: { persistentOutput: true }
	},
	{
		title: 'Cloning Repository',
		task: async ctx => {
			try {
				await execute('gh', ['repo', 'clone', ctx.gitRepoUrl]);
			} catch (e) {
				throw new ListrError(e.message);
			}
		},
		options: { persistentOutput: true }
	}
]);
