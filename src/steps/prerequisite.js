const { Listr } = require('listr2');

const { execute } = require('../helpers/cmd');
const ListrError = require('../helpers/custom-error');

const ERROR_MESSAGE = 'cli was not found';

module.exports = new Listr([
	{
		title: 'Checking prerequisites to install the template',
		task: (_ctx, subTask) =>
			subTask.newListr([
				{
					title: 'Check if git is available',
					task: async () => {
						try {
							await execute('git', ['--version']);
						} catch (e) {
							throw new ListrError(`git ${ERROR_MESSAGE}`);
						}
					}
				},
				{
					title: 'Check if gh is available',
					task: async () => {
						try {
							await execute('gh', ['--version']);
						} catch (e) {
							throw new ListrError(`git ${ERROR_MESSAGE}`);
						}
					}
				}
			])
	}
]);
