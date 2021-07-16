export {};

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeSolved(): R;
            toBeValid(): R;
        }
    }
}
