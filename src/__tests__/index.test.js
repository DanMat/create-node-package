import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';

const promisifyExec = promisify(exec);

const cli = args =>
	promisifyExec(`node -r esm ${path.resolve('./bin/cli')} ${args.join(' ')}`);

test('Sample test', async () => {
	expect(1).toBe(1);
});

