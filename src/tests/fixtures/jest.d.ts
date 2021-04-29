export {};

declare global {
    namespace jest {
        interface Matchers<R> {
            toHaveNoDuplicates(): R;
        }
    }
}
