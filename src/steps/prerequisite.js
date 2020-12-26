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
							try {
								await execute('git', ['--version']);
							} catch (e) {
								throw new Error(e);
							}
						}
					},
					{
						title: 'Check if gh is available',
						task: async () => {
							try {
								await execute('gh', ['--version']);
							} catch (e) {
								throw new Error(e);
							}
						}
					}
				],
				{ concurrent: true }
			)
	}
]);
