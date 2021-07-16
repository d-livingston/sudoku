export default function time(callback: () => void): number {
    const start = process.hrtime();
    callback();
    const end = process.hrtime(start);
    return 1000 * end[0] + end[1] / 1000000;
}
