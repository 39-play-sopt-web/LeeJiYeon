import styled from '@emotion/styled';
import type { MovieDetail } from '../../types/movie';
import {
  formatCountry,
  formatCurrency,
  formatLanguage,
  formatList,
} from '../../utils/format';

interface MovieBasicInfoProps {
  movie: MovieDetail;
}

const MovieBasicInfo = ({ movie }: MovieBasicInfoProps) => {
  const infoItems = [
    { label: '원제', value: movie.original_title },
    { label: '원어', value: formatLanguage(movie.original_language) },
    {
      label: '제작 국가',
      value: formatList(
        movie.production_countries.map((country) =>
          formatCountry(country.iso_3166_1),
        ),
      ),
    },
    {
      label: '사용 언어',
      value: formatList(
        movie.spoken_languages.map((language) =>
          formatLanguage(language.iso_639_1),
        ),
      ),
    },
    { label: '예산', value: formatCurrency(movie.budget) },
    { label: '수익', value: formatCurrency(movie.revenue) },
  ];

  return (
    <Section>
      <SectionTitle>기본 정보</SectionTitle>
      <InfoGrid>
        {infoItems.map((item) => (
          <InfoItem key={item.label}>
            <InfoLabel>{item.label}</InfoLabel>
            <InfoValue>{item.value}</InfoValue>
          </InfoItem>
        ))}
      </InfoGrid>
    </Section>
  );
};

export default MovieBasicInfo;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 700;
`;

const InfoGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(26rem, 1fr));
  gap: 1.2rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1.6rem 2rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.surface};
`;

const InfoLabel = styled.dt`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const InfoValue = styled.dd`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  word-break: keep-all;
`;