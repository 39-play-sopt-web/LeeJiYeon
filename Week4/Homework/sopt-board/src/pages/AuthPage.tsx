import { useState } from 'react';
import type { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useIssueAuthCode } from '../hooks/useIssueAuthCode';
import { PART_OPTIONS, isPart } from '../constants/part';
import { getErrorMessage } from '../utils/getErrorMessage';
import type { Part } from '../types/auth';

const AuthPage = () => {
  const navigate = useNavigate();
  const [part, setPart] = useState<Part | ''>('');
  const { mutate, isPending, isError, error, reset } = useIssueAuthCode();

  const handlePartChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setPart(isPart(value) ? value : '');
    if (isError) reset();
  };

  const handleIssue = () => {
    if (!part) return;

    mutate(part, {
      onSuccess: () => {
        navigate('/posts');
      },
    });
  };

  return (
    <Wrapper>
      <Card>
        <Title>PLAY SOPT 게시판</Title>
        <Description>파트를 선택하고 회원 코드를 발급받으세요.</Description>

        <Select value={part} onChange={handlePartChange}>
          <option value="">파트를 선택해 주세요</option>
          {PART_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>

        <IssueButton type="button" onClick={handleIssue} disabled={!part || isPending}>
          {isPending ? '발급 중...' : '코드 발급'}
        </IssueButton>

        {isError && (
          <ErrorMessage>{getErrorMessage(error, '코드 발급에 실패했어요. 다시 시도해 주세요.')}</ErrorMessage>
        )}

        <ListButton type="button" onClick={() => navigate('/posts')}>
          게시판 보기
        </ListButton>
      </Card>
    </Wrapper>
  );
};

export default AuthPage;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 16px;
`;

const Card = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  padding: 32px 24px;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;

const Description = styled.p`
  margin-bottom: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray500};
  text-align: center;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: ${({ theme }) => theme.colors.white};
`;

const IssueButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray300};
  }
`;

const ErrorMessage = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
`;

const ListButton = styled.button`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.gray500};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;