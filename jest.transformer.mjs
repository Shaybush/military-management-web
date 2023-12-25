// the file rename as .mjs to clearly indicate it's an ES module
import babelJest from 'babel-jest';

export default {
	...babelJest.default.createTransformer(),
	process(src, filename, config, options) {
		src = src.replace(
			'import.meta.env',
			JSON.stringify({
				// Mock your environment variables here
				VITE_GOOGLE_ID: 'mocked-api-key',
				// etc.
			})
		);

		return babelJest.default.createTransformer().process(src, filename, config, options);
	},
};
