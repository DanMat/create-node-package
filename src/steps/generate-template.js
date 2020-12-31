const { Listr } = require('listr2');
const mkdirp = require('mkdirp');
const checkFolderExists = require('check-folder-exists');

module.exports = new Listr([
	{
		title:
			"Let's get started by creating a new local folder for your template.",
		task: async (ctx, opt) => {
			ctx.localFolder = await opt.prompt([
				{
					type: 'input',
					name: 'folder',
					message: 'Folder name',
					validate: async (str) =>
						!(await checkFolderExists('./', str))
							? true
							: 'Folder already exists.',
				},
			]);

			mkdirp.sync(`./${ctx.localFolder}`);
		},
		enabled: ({ local }) => !!local,
	},
]);
