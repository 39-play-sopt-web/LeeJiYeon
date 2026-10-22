import { useEffect, useRef, useState } from 'react';
import * as S from './Game.styles';
import Modal from '../Modal/Modal';
import { LEVELS } from '../../constants/level';
import { createGame } from '../../utils/game';
import { saveRecord } from '../../utils/ranking';
import { getNow, getElapsedSeconds } from '../../utils/time';

const Game = ({ level, onTimeChange }) => {
  const { size, maxNumber } = LEVELS.find((item) => item.value === level);

  const [game, setGame] = useState(() => createGame(size));
  const [clickedIndex, setClickedIndex] = useState(null);
  const [result, setResult] = useState(null);

  const startTimeRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    startTimeRef.current = getNow();
    timerRef.current = setInterval(() => {
      onTimeChange(getElapsedSeconds(startTimeRef.current));
    }, 10);
  };

  const finishGame = () => {
    clearInterval(timerRef.current);

    const playTime = Number(
      getElapsedSeconds(startTimeRef.current).toFixed(2)
    );
    onTimeChange(playTime);

    saveRecord({
      level,
      playTime,
      playedAt: new Date().toISOString(),
    });

    setResult(playTime);
  };

  const handleConfirm = () => {
    setResult(null);
    setGame(createGame(size));
    setClickedIndex(null);
    onTimeChange(0);
  };

  const handleClick = (index) => {
    const number = game.board[index];
    if (number !== game.next) return;

    setClickedIndex(index);

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
        다음 숫자 <strong>{result === null ? game.next : '완료!'}</strong>(
        {game.next} / {maxNumber})
      </S.NextNumber>

      <S.Board boardSize={size}>
        {game.board.map((number, index) => (
          <S.Cell
            key={`${index}-${number}`}
            isFlashing={index === clickedIndex}
            disabled={number === null}
            onClick={() => handleClick(index)}
          >
            {number}
          </S.Cell>
        ))}
      </S.Board>

      {result !== null && (
        <Modal title={`🎉 Level ${level} 클리어!`} onConfirm={handleConfirm}>
          <S.ResultTime>{result.toFixed(2)}초</S.ResultTime>
        </Modal>
      )}
    </S.Wrapper>
  );
};

export default Game;