import { useCallback, useState } from 'react';
import type { ChangeEvent, SyntheticEvent } from 'react';
import styled from '@emotion/styled';
import PostCard from '../components/PostCard';
import { usePostList } from '../hooks/usePostList';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const MIN_KEYWORD_LENGTH = 2;
const MAX_KEYWORD_LENGTH = 50;

const PostListPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [keyword, setKeyword] = useState('');

  const { data, isPending, isError, hasNextPage, isFetchingNextPage, fetchNextPage } =
    usePostList(keyword);

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  const trimmedInput = inputValue.trim();
  const isTooShort = trimmedInput.length > 0 && trimmedInput.length < MIN_KEYWORD_LENGTH;
  const isSearchDisabled = trimmedInput.length === 0 || isTooShort;

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const bottomRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: handleLoadMore,
    enabled: hasNextPage,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);

    if (value.trim() === '') {
      setKeyword('');
    }
  };

  const handleSearch = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSearchDisabled) return;
    setKeyword(trimmedInput);
  };

  const renderList = () => {
    if (isPending) return <Status>불러오는 중...</Status>;
    if (isError) return <Status>목록을 불러오지 못했어요.</Status>;
    if (posts.length === 0) {
      return <Status>{keyword ? `'${keyword}' 검색 결과가 없어요.` : '아직 게시글이 없어요.'}</Status>;
    }

    return (
      <List>
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </List>
    );
  };

  return (
    <>
      <SearchForm onSubmit={handleSearch}>
        <SearchInput
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="제목으로 검색"
          maxLength={MAX_KEYWORD_LENGTH}
        />
        <SearchButton type="submit" disabled={isSearchDisabled}>
          검색
        </SearchButton>
      </SearchForm>
      {isTooShort && <HelperText>검색어는 {MIN_KEYWORD_LENGTH}글자 이상 입력해 주세요.</HelperText>}

      {renderList()}

      <Bottom ref={bottomRef} />
      {isFetchingNextPage && <Status>더 불러오는 중...</Status>}
    </>
  );
};

export default PostListPage;

const SearchForm = styled.form`
  display: flex;
  gap: 8px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.radius.sm};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SearchButton = styled.button`
  padding: 0 20px;
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

const HelperText = styled.p`
  margin-top: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.error};
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
`;

const Status = styled.p`
  margin-top: 40px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray500};
  text-align: center;
`;

const Bottom = styled.div`
  height: 1px;
`;