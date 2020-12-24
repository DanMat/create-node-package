const mkdirp = require('mkdirp');
const isNpmNameAvailable = require('npm-name');
const isNpmNameValidate = require("validate-npm-package-name");
const checkFolderExists = require('check-folder-exists');

module.exports.isProjectDirValid = async name => !await checkFolderExists('./', name)
module.exports.createProjectDir = name => mkdirp.sync(`./${name}`);

module.exports.isPackageNameValid = async name => {
    const { validForNewPackages, validForOldPackages } = isNpmNameValidate(name);
    return await isNpmNameAvailable(name) && validForNewPackages && validForOldPackages;
};
