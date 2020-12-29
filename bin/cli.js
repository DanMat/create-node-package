#! /usr/bin/env node

const { runCLI } = require('../src');
const ListrError = require('../src/helpers/custom-error');

runCLI(process.argv).catch((err) => {
	if (!(err instanceof ListrError)) console.error(err);
	process.exit(1);
});
