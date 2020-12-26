import Listr from 'listr';

import { execute } from '../helpers/cmd';

export default new Listr([
	{
		title: 'Checking prerequisites to install the template',
		task: () =>
			new Listr(
				[
					{
						title: 'Check if git is available',
						task: async () => {
							await execute('git', ['--version'])
						}
					},
					{
						title: 'Check if gh is available',
						task: async () => {
							await execute('gh', ['--version']);
						}
					}
				],
				{ concurrent: true }
			)
	}
]);
