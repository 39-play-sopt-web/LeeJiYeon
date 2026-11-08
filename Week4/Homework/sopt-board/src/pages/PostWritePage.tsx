import { useState } from 'react';
import type { ChangeEvent, SyntheticEvent } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import type { Theme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useCreatePost } from '../hooks/useCreatePost';
import { getErrorMessage } from '../utils/getErrorMessage';
import type { CreatePostRequest } from '../types/post';

type FieldKey = keyof CreatePostRequest;

interface Step {
  key: FieldKey;
  label: string;
  placeholder: string;
  maxLength: number;
  multiline: boolean;
}

const STEPS: Step[] = [
  { key: 'title', label: '제목', placeholder: '제목을 입력하세요', maxLength: 50, multiline: false },
  { key: 'content', label: '본문', placeholder: '본문을 입력하세요', maxLength: 1000, multiline: true },
  { key: 'author', label: '작성자', placeholder: '작성자를 입력하세요', maxLength: 20, multiline: false },
];

const INITIAL_FORM: CreatePostRequest = {
  title: '',
  content: '',
  author: '',
};

const PostWritePage = () => {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState<CreatePostRequest>(INITIAL_FORM);
  const { mutate, isPending } = useCreatePost();

  const step = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;

  const value = form[step.key];
  const length = value.length;
  const isEmpty = value.trim().length === 0;
  const isOver = length > step.maxLength;
  const isButtonDisabled = isEmpty || isOver || isPending;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [step.key]: e.target.value }));
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isButtonDisabled) return;

    if (!isLastStep) {
      setStepIndex((prev) => prev + 1);
      return;
    }

    const body: CreatePostRequest = {
      title: form.title.trim(),
      content: form.content.trim(),
      author: form.author.trim(),
    };

    mutate(body, {
      onSuccess: () => {
        alert(`${body.author}님, 게시글이 작성되었어요!`);
        navigate('/posts');
      },
      onError: (error) => {
        alert(getErrorMessage(error, '게시글 작성에 실패했어요.'));
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Title>글쓰기</Title>

      <Label htmlFor={step.key}>{step.label}</Label>
      {step.multiline ? (
        <TextArea
          key={step.key}
          id={step.key}
          value={value}
          onChange={handleChange}
          placeholder={step.placeholder}
          hasError={isOver}
          autoFocus
        />
      ) : (
        <Input
          key={step.key}
          id={step.key}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={step.placeholder}
          hasError={isOver}
          autoFocus
        />
      )}

      <InfoRow>
        <ErrorMessage>
          {isOver && `${step.label}은(는) ${step.maxLength}자 이내로 입력해 주세요.`}
        </ErrorMessage>
        <Counter hasError={isOver}>
          {length} / {step.maxLength}
        </Counter>
      </InfoRow>

      <ButtonRow>
        <SubButton type="button" onClick={() => navigate('/posts')}>
          목록으로
        </SubButton>
        <MainButton type="submit" disabled={isButtonDisabled}>
          {isLastStep ? (isPending ? '작성 중...' : '작성') : '다음'}
        </MainButton>
      </ButtonRow>
    </form>
  );
};

export default PostWritePage;

const Title = styled.h1`
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 700;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
`;

const fieldStyle = ({ theme, hasError }: { theme: Theme; hasError: boolean }) => css`
  width: 100%;
  padding: 12px;
  border: 1px solid ${hasError ? theme.colors.error : theme.colors.gray300};
  border-radius: ${theme.radius.sm};
  background-color: ${theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${hasError ? theme.colors.error : theme.colors.primary};
  }
`;

const Input = styled.input<{ hasError: boolean }>`
  ${fieldStyle}
`;

const TextArea = styled.textarea<{ hasError: boolean }>`
  ${fieldStyle}
  min-height: 240px;
  resize: vertical;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 6px;
  min-height: 18px;
  font-size: 12px;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
`;

const Counter = styled.span<{ hasError: boolean }>`
  flex-shrink: 0;
  color: ${({ theme, hasError }) => (hasError ? theme.colors.error : theme.colors.gray500)};
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
`;

const SubButton = styled.button`
  padding: 10px 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.gray500};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;

const MainButton = styled.button`
  padding: 10px 16px;
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