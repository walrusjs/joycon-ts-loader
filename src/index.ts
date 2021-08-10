import { MultiLoader } from 'joycon';
import { register } from 'ts-node';
import compilerOptions from './compilerOptions';
import normalizeExport from './normalizeExport';

register({
	compilerOptions,
  typeCheck: false,
});

function loadSync(filepath: string): any {
  // @ts-ignore
	const data = require(filepath);

	return normalizeExport(data);
}

function load(filepath: string): Promise<any> {
	const data = loadSync(filepath);

	return Promise.resolve(data);
}

const loader: MultiLoader = {
	test: /\.ts$/,
	load,
	loadSync
};

export default loader;