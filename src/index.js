import figlet from 'figlet';

const LOGO = 'CREATE DEPLOY NODE PACKAGES';
const FONT_STYLE = 'contessa';

export const runCLI = async _args => {
	console.log(figlet.textSync(LOGO, FONT_STYLE));
};