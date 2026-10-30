import styled from '@emotion/styled';
import { RATING_FILTERS } from '../../constants/filter';

interface RatingFilterProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

const RatingFilter = ({ selectedId, onSelect }: RatingFilterProps) => {
  return (
    <FilterList>
      {RATING_FILTERS.map((filter) => (
        <li key={filter.id}>
          <Chip
            type="button"
            isSelected={filter.id === selectedId}
            aria-pressed={filter.id === selectedId}
            onClick={() => onSelect(filter.id)}
          >
            {filter.label}
          </Chip>
        </li>
      ))}
    </FilterList>
  );
};

export default RatingFilter;

const FilterList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2.4rem;
`;

const Chip = styled.button<{ isSelected: boolean }>`
  padding: 0.6rem 1.4rem;
  border: 1px solid
    ${({ theme, isSelected }) =>
      isSelected ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ isSelected }) => (isSelected ? 700 : 500)};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.onPrimary : theme.colors.textSecondary};
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.primary : theme.colors.surface};
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme, isSelected }) =>
      isSelected ? theme.colors.onPrimary : theme.colors.textPrimary};
  }
`;