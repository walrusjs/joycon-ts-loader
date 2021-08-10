import chalk from 'chalk';
import JoyCon from 'joycon';
import { resolve } from 'path';

import JoyConTSLoader from '../lib';

const joycon = new JoyCon({
	cwd: resolve(__dirname, './fixture'),
	stopDir: __dirname
});

joycon.addLoader(JoyConTSLoader);

const expectedConfig = {
	entry: 'x.js',
	resolve: {
		extensions: ['.ts']
	},
};

describe('Load TypeScript config', () => {
	it(
		chalk`should load TypeScript config via {magenta "module.exports = config"} successfully`,
		async () => {
			const { data, path } = await joycon.load(['config1.ts']);
			expect(path).toEqual(expect.stringMatching(/config1\.ts$/));
			expect(data).toEqual(expectedConfig);
		}
	);
	it(
		chalk`should load TypeScript config via {magenta "export = config"} successfully`,
		async () => {
			const { data, path } = await joycon.load(['config2.ts']);
			expect(path).toEqual(expect.stringMatching(/config2\.ts$/));
			expect(data).toEqual(expectedConfig);
		}
	);
	it(
		chalk`should load TypeScript config via {magenta "export default config"} successfully`,
		async () => {
			const { data, path } = await joycon.load(['config-es.ts']);
			expect(path).toEqual(expect.stringMatching(/config-es\.ts$/));
			expect(data).toEqual(expectedConfig);
		}
	);
});
