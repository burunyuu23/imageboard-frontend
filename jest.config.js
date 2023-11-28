const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './'
})

const customConfig = {
    'clearMocks': true,
    'coverageDirectory': '.coverage',
    'setupFilesAfterEnv': ['./jest.setup.js'],
    'testEnvironment': 'jsdom'
}

module.exports = createJestConfig(customConfig)