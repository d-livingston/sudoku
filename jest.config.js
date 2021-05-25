module.exports = {
    roots: ["<rootDir>/src"],
    testMatch: ["**/tests/**/*.+(test).+(ts|tsx)"],
    setupFilesAfterEnv: ["./src/tests/fixtures/extend-expect.ts"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    moduleNameMapper: {
        "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    },
};
