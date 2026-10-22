import * as S from './Header.styles';
import { LEVELS } from '../../constants/level';

const MENUS = [
  { key: 'game', label: '게임' },
  { key: 'ranking', label: '랭킹' },
];

const Header = ({ menu, onChangeMenu, level, onChangeLevel, time }) => {
  return (
    <S.Header>
      <S.Title>🔢 숫자 클릭 게임</S.Title>

      <S.Nav>
        {MENUS.map(({ key, label }) => (
          <S.MenuButton
            key={key}
            isActive={menu === key}
            onClick={() => onChangeMenu(key)}
          >
            {label}
          </S.MenuButton>
        ))}
      </S.Nav>

      <S.Right>
        {menu === 'game' && (
          <>
            <S.Select
              value={level}
              onChange={(e) => onChangeLevel(Number(e.target.value))}
            >
              {LEVELS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </S.Select>
            <S.Timer>{time.toFixed(2)}초</S.Timer>
          </>
        )}
      </S.Right>
    </S.Header>
  );
};

export default Header;