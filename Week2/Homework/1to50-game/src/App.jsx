import { useState } from 'react';
import Header from './components/Header/Header';
import Game from './components/Game/Game';
import Ranking from './components/Ranking/Ranking';
import * as S from './App.styles';

const App = () => {
  const [menu, setMenu] = useState('game'); // 'game' | 'ranking'
  const [level, setLevel] = useState(1);
  const [time, setTime] = useState(0);

  const handleChangeMenu = (nextMenu) => {
    setMenu(nextMenu);
    setTime(0);
  };

  const handleChangeLevel = (nextLevel) => {
    setLevel(nextLevel);
    setTime(0);
  };

  return (
    <>
      <Header
        menu={menu}
        onChangeMenu={handleChangeMenu}
        level={level}
        onChangeLevel={handleChangeLevel}
        time={time}
      />
      <S.Main>
        {menu === 'game' ? (
          <Game key={level} level={level} onTimeChange={setTime} />
        ) : (
          <Ranking />
        )}
      </S.Main>
    </>
  );
};

export default App;