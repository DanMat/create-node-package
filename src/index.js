import figlet from 'figlet';
import prerequisite from './steps/prerequisite';
import getUsersNPMToken from './steps/npmtoken';

const LOGO = 'CREATE DEPLOY NODE PACKAGES';
const FONT_STYLE = 'contessa';

export const runCLI = async _args => {
	console.log(figlet.textSync(LOGO, FONT_STYLE));

	await prerequisite.run();
	await getUsersNPMToken();
};
