import styled from '@emotion/styled';

function App() {
  return (
    <Wrapper>
      <Title>
        Jiyeon's <Point>Fav Movies</Point>
      </Title>
      <Description>테마 적용 확인용</Description>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.main`
  padding: 4rem;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 800;
`;

const Point = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const Description = styled.p`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;