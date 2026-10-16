import { useEffect, useRef, useState } from 'react';
import * as S from './Game.styles';
import { LEVELS } from '../../constants/level';
import { createGame } from '../../utils/game';
import { saveRecord } from '../../utils/ranking';

const Game = ({ level, onTimeChange }) => {
  const { size, maxNumber } = LEVELS.find((item) => item.value === level);

  const [game, setGame] = useState(() => createGame(size));
  const startTimeRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      onTimeChange((Date.now() - startTimeRef.current) / 1000);
    }, 10);
  };

  const finishGame = () => {
    clearInterval(timerRef.current);

    const playTime = Number(
      ((Date.now() - startTimeRef.current) / 1000).toFixed(2)
    );
    onTimeChange(playTime);

    saveRecord({
      level,
      playTime,
      playedAt: new Date().toISOString(),
    });

    alert(`🎉 Level ${level} 클리어!\n걸린 시간: ${playTime.toFixed(2)}초`);

    setGame(createGame(size));
    onTimeChange(0);
  };

  const handleClick = (index) => {
    const number = game.board[index];
    if (number !== game.next) return;

    if (number === 1) startTimer();

    if (number === maxNumber) {
      finishGame();
      return;
    }

    const [newNumber, ...rest] = game.remaining;
    const board = [...game.board];
    board[index] = newNumber ?? null;

    setGame({ board, remaining: rest, next: game.next + 1 });
  };

  return (
    <S.Wrapper>
      <S.NextNumber>
        다음 숫자 <strong>{game.next}</strong>({game.next} / {maxNumber})
      </S.NextNumber>

      <S.Board boardSize={size}>
        {game.board.map((number, index) => (
          <S.Cell
            key={index}
            disabled={number === null}
            onClick={() => handleClick(index)}
          >
            {number}
          </S.Cell>
        ))}
      </S.Board>
    </S.Wrapper>
  );
};

export default Game;