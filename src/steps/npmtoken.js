const inquirer = require('inquirer');
const isEmail = require('validator/lib/isEmail');
const isURL = require('validator/lib/isURL');
const RegistryClient = require('npm-registry-client');

const { execute } = require('../helpers/cmd');

const ERROR_MESSAGE = `
We regret to inform you that we failed to create a NPM token for you.
To manually create one. Go to -> https://www.npmjs.com/settings/{username}/tokens/ page
And, create a publish token.

Use the generated token to run the generator again
npx create-deploy-node-packages --npm_token {generated_token}

For further help on how to create a NPM token
https://docs.npmjs.com/creating-and-viewing-access-tokens
`;

const client = new RegistryClient();

const getNPMToken = ({ registry, username, email, password }) =>
	new Promise((resolve, reject) => {
		client.adduser(
			registry,
			{
				auth: {
					username,
					email,
					password
				}
			},
			(err, data) => {
				const { token } = data || {};
				if (err) reject(err);
				if (!token) reject(new Error('No token was returned'));
				resolve(token);
			}
		);
	});

const resolveUndefined = (str = '') => (str === 'undefined' ? '' : str);

module.exports = async () => {
	console.log(
		"\nLet's generate a NPM token. Which we will use to publish your package.\n"
	);

	const prompts = inquirer.prompt([
		{
			type: 'input',
			name: 'registry',
			message: 'npm registry',
			default:
				resolveUndefined(await execute('npm', ['config', 'get', 'registry'])) ||
				'https://registry.npmjs.com/',
			validate: str =>
				isURL(str, {
					protocols: ['http', 'https'],
					require_protocol: true
				})
					? true
					: 'Not a valid url. Needs to start with https or http.'
		},
		{
			type: 'input',
			name: 'username',
			message: 'npm username',
			validate: str =>
				str.length > 0 && !/[A-Z]/.test(str)
					? true
					: 'Caps are not allowed in the username'
		},
		{
			type: 'password',
			name: 'password',
			message: 'npm password',
			validate: str => str.length > 0
		},
		{
			type: 'input',
			name: 'email',
			message: 'npm email',
			default: resolveUndefined(
				await execute('npm', ['config', 'get', 'email'])
			),
			validate: str => (isEmail(str) ? true : 'Not a valid email id')
		}
	]);

	try {
		const token = await getNPMToken(await prompts);
		console.log('Secured a NPM token for deploying the package.');
		return token;
	} catch (e) {
		console.log(e);
		throw new Error(ERROR_MESSAGE);
	}
};
