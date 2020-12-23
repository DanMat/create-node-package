const questions = [
	{
		type: 'text',
		name: 'packageDescription',
		message: 'Enter a description for this package'
	},
	{
		type: 'text',
		name: 'authorName',
		message: 'Enter the author\'s name for this package'
	},
	{
		type: 'text',
		name: 'packageReference',
		message: 'Enter a global variable name that will be used for this library. If, used in the browser (ie, MyAwesomeLib in window.MyAwesomeLib)'
	}
];

module.exports = {
	questions
};

