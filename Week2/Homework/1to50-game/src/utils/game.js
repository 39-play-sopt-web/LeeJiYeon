export const shuffle = (array) => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);


export const createGame = (size) => {
  const half = size * size;

  return {
    board: shuffle(range(1, half)),
    remaining: shuffle(range(half + 1, half * 2)),
    next: 1,
  };
};