expect.extend({
    toHaveNoDuplicates<T>(array: T[]) {
        const pass = new Set(array).size === array.length;

        if (pass) {
            return {
                message: () => ``,
                pass: true,
            };
        } else {
            return {
                message: () => ``,
                pass: false,
            };
        }
    },
});
