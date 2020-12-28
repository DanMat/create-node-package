// const inquirer = require('inquirer');
// const Listr = require('listr');

// const { execute } = require('../helpers/cmd');

// module.exports = async () => {
// 	let repoName;

// 	const task = new Listr([
// 		{
// 			title: 'Let\'s start creating a github repository for our template.',
// 			task: async () => {
// 				const prompts = inquirer.prompt([{
// 					type: 'input',
// 					name: 'gitRepoName',
// 					message: 'Github repository name',
// 					validate: async str => {
// 						try {
// 							await execute('gh', ['repo', 'create', str, '--public', '-y']);
// 							return true;
// 						} catch(e) {
// 							return e.toString()
// 						}
// 					}
// 				}]);
// 				repoName = await prompts;
// 			}
// 		}
// 	]);

// 	await task.run();

// 	return repoName;
// }
