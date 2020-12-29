const { Listr } = require('listr2');
const ListrError = require('../helpers/custom-error');

const { execute, executeInRepo } = require('../helpers/cmd');

module.exports = new Listr([
	{
		title: 'Github Information',
		task: async (ctx, opt) => {
			ctx.gitRepoName = await opt.prompt([
				{
					type: 'input',
					name: 'name',
					message: 'Name for your repository',
					validate: async str => {
						try {
							ctx.gitUrl = await execute('gh', [
								'repo',
								'create',
								str,
								'--public',
								'-y'
							]);
							return true;
						} catch (e) {
							throw new ListrError(e.message);
						}
					}
				}
			]);
		}
	},
	{
		title: 'Cloning Repository',
		task: async ctx => {
			try {
				await execute('gh', ['repo', 'clone', ctx.gitUrl]);
			} catch (e) {
				throw new ListrError(e.message);
			}
		}
	},
	{
		title: 'Setting NPM token to repository',
		task: async ctx => {
			try {
				await executeInRepo(ctx.gitRepoName, 'gh', [
					'secret',
					'set',
					'NPM_TOKEN',
					`-b"${ctx.npmToken}"`
				]);
			} catch (e) {
				throw new ListrError(e.message);
			}
		}
	}
]);
