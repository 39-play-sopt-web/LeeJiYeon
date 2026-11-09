import { useState } from 'react';
import type { ChangeEvent, SyntheticEvent } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import type { Theme } from '@emotion/react';
import type { UpdatePostRequest } from '../types/post';

const MAX_TITLE_LENGTH = 50;
const MAX_CONTENT_LENGTH = 1000;

interface PostEditFormProps {
  initialValue: UpdatePostRequest;
  isPending: boolean;
  onCancel: () => void;
  onSave: (body: UpdatePostRequest) => void;
}

const PostEditForm = ({ initialValue, isPending, onCancel, onSave }: PostEditFormProps) => {
  const [form, setForm] = useState<UpdatePostRequest>(initialValue);

  const isTitleOver = form.title.length > MAX_TITLE_LENGTH;
  const isContentOver = form.content.length > MAX_CONTENT_LENGTH;
  const isEmpty = form.title.trim() === '' || form.content.trim() === '';
  const isSaveDisabled = isEmpty || isTitleOver || isContentOver || isPending;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSaveDisabled) return;
    onSave({ title: form.title.trim(), content: form.content.trim() });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="edit-title">제목</Label>
      <Input
        id="edit-title"
        name="title"
        type="text"
        value={form.title}
        onChange={handleChange}
        hasError={isTitleOver}
        autoFocus
      />
      <InfoRow>
        <ErrorMessage>{isTitleOver && `제목은 ${MAX_TITLE_LENGTH}자 이내로 입력해 주세요.`}</ErrorMessage>
        <Counter hasError={isTitleOver}>
          {form.title.length} / {MAX_TITLE_LENGTH}
        </Counter>
      </InfoRow>

      <Label htmlFor="edit-content">본문</Label>
      <TextArea
        id="edit-content"
        name="content"
        value={form.content}
        onChange={handleChange}
        hasError={isContentOver}
      />
      <InfoRow>
        <ErrorMessage>
          {isContentOver && `본문은 ${MAX_CONTENT_LENGTH}자 이내로 입력해 주세요.`}
        </ErrorMessage>
        <Counter hasError={isContentOver}>
          {form.content.length} / {MAX_CONTENT_LENGTH}
        </Counter>
      </InfoRow>

      <ButtonRow>
        <SubButton type="button" onClick={onCancel}>
          취소
        </SubButton>
        <MainButton type="submit" disabled={isSaveDisabled}>
          {isPending ? '저장 중...' : '저장'}
        </MainButton>
      </ButtonRow>
    </form>
  );
};

export default PostEditForm;

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
  min-height: 200px;
  resize: vertical;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin: 6px 0 16px;
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