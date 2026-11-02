export const getNow = () => Date.now();
export const getElapsedSeconds = (startTime) => (getNow() - startTime) / 1000;