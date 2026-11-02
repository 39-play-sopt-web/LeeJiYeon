import { useState } from 'react';
import * as S from './Ranking.styles';
import { getRecords, clearRecords, sortRecords } from '../../utils/ranking';

const formatDate = (isoString) =>
  new Date(isoString).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

const Ranking = () => {
  const [records, setRecords] = useState(() => sortRecords(getRecords()));

  const handleReset = () => {
    clearRecords();
    setRecords([]);
  };

  return (
    <S.Wrapper>
      <S.TitleRow>
        <S.Title>🏆 랭킹</S.Title>
        <S.ResetButton onClick={handleReset}>초기화</S.ResetButton>
      </S.TitleRow>

      {records.length === 0 ? (
        <S.Empty>아직 기록이 없어요. 게임을 플레이해보세요!</S.Empty>
      ) : (
        <S.Table>
          <thead>
            <tr>
              <th>순위</th>
              <th>레벨</th>
              <th>플레이 시간</th>
              <th>기록 시각</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={record.playedAt}>
                <td>{index + 1}</td>
                <td>Level {record.level}</td>
                <td>{record.playTime.toFixed(2)}초</td>
                <td>{formatDate(record.playedAt)}</td>
              </tr>
            ))}
          </tbody>
        </S.Table>
      )}
    </S.Wrapper>
  );
};

export default Ranking;