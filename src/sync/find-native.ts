import path from 'path';
import { loadTSSync } from '../util.js';

/**
 * find the closest tsconfig.json file using native ts.findConfigFile
 *
 * You must have `typescript` installed to use this
 *
 * @param {string} filename - path to file to find tsconfig for (absolute or relative to cwd)
 * @returns {string} absolute path to closest tsconfig.json
 */
export function findNative(filename: string): string {
	const ts = loadTSSync();
	const { findConfigFile, sys } = ts;
	const tsconfigFile = findConfigFile(path.dirname(path.resolve(filename)), sys.fileExists);
	if (!tsconfigFile) {
		throw new Error(`no tsconfig file found for ${filename}`);
	}
	return tsconfigFile;
}