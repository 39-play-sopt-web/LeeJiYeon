import { useState } from 'react';
import Header from './components/Header/Header';
import * as S from './App.styles';

const App = () => {
  const [menu, setMenu] = useState('game');
  const [level, setLevel] = useState(1);
  const [time, setTime] = useState(0);

  return (
    <>
      <Header
        menu={menu}
        onChangeMenu={setMenu}
        level={level}
        onChangeLevel={setLevel}
        time={time}
      />
      <S.Main>
        {menu === 'game' ? <p>게임판 자리 (Level {level})</p> : <p>랭킹 자리</p>}
      </S.Main>
    </>
  );
};

export default App;