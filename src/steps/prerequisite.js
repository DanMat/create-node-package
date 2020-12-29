const { Listr } = require('listr2');

const { execute } = require('../helpers/cmd');
const ListrError = require('../helpers/custom-error');

const ERROR_MESSAGE =
	'cli is not installed. You can use this doc to set it up ->';

module.exports = new Listr([
	{
		title: 'Check if git is available',
		task: async () => {
			try {
				await execute('git', ['--version']);
			} catch (e) {
				throw new ListrError(`git ${ERROR_MESSAGE} https://git-scm.com/`);
			}
		},
	},
	{
		title: 'Check if gh is available',
		task: async () => {
			try {
				await execute('gh', ['--version']);
			} catch (e) {
				throw new ListrError(
					`gh ${ERROR_MESSAGE} https://cli.github.com/manual/`
				);
			}
		},
	},
]);
