module.exports = {
	moduleDirectories: ['node_modules', 'src'],
    setupFilesAfterEnv: ['<rootDir>/test/setup/setupEnzyme.js'],
	testPathIgnorePatterns: [
		'<rootDir>/test/setup/',
	],
	testRegex: 'test/.*\\.test\\.js$',
	snapshotSerializers: ['enzyme-to-json/serializer'],
    moduleNameMapper: {
        '\\.(png)$': '<rootDir>/test/setup/fileMock.js',
        '\\.(css|less)$': '<rootDir>/test/setup/fileMock.js',
    },
};
