const { Listr } = require('listr2');
const mkdirp = require('mkdirp');
const checkFolderExists = require('check-folder-exists');
const isNpmNameValidate = require('validate-npm-package-name');
const isNpmNameAvailable = require('npm-name');

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
	{
		title: 'Template information',
		task: async (ctx, opt) => {
			ctx.packageInfo = await opt.prompt([
				{
					type: 'text',
					name: 'name',
					message: 'Enter a name for the package',
					validate: async (str) => {
						const {
							validForNewPackages,
							validForOldPackages,
						} = isNpmNameValidate(str);
						if (validForNewPackages && validForOldPackages) {
							return (await isNpmNameAvailable(str))
								? true
								: 'npm package name is taken';
						} else {
							return 'Invalid package name.';
						}
					},
				},
				{
					type: 'text',
					name: 'description',
					message: 'Enter a description for the package',
				},
				{
					type: 'text',
					name: 'authorName',
					message: "Enter the author's name for the package",
				},
				{
					type: 'select',
					name: 'type',
					message: 'Select the type of template you want to create',
					choices: [
						{
							name: 'node',
							message:
								'Node App. Template generates an UMD bundle on build. So, works both in the fronend and backend',
							value: 'npm-module-template',
						},
						{
							name: 'cli',
							message: 'Node CLI. Template generates a CJS bundle on build',
							value: 'node-cli-template',
						},
						{
							name: 'react',
							message: 'React App. Template generates an ESM bundle on build.',
							value: 'react-template',
						},
					],
				},
			]);
		},
	},
]);
