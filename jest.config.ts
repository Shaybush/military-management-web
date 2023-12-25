export default {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.(js|jsx)$': 'babel-jest',
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				diagnostics: {
					ignoreCodes: [1343],
				},
				astTransformers: {
					before: [
						{
							path: 'node_modules/ts-jest-mock-import-meta', // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
							options: {
								metaObjectReplacement: {
									env: [{ VITE_GOOGLE_ID: 'https://www.url.com' }],
								},
							},
						},
					],
				},
			},
		],
		'^.+\\.[t|j]sx?$': '<rootDir>/jest.transformer.mjs',

		// process `*.tsx` files with `ts-jest`
	},
	transformIgnorePatterns: ['<rootDir>/node_modules'],
	moduleNameMapper: {
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
	},
};
