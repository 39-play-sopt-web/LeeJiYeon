import { useMutation } from '@tanstack/react-query';
import { issueAuthorizationCode } from '../api/auth';
import { storage } from '../utils/storage';
import type { Part } from '../types/auth';

export const useIssueAuthCode = () => {
  return useMutation({
    mutationFn: (part: Part) => issueAuthorizationCode({ part }),
    onSuccess: ({ authorizationCode }, part) => {
      storage.setAuthCode(authorizationCode);
      storage.setPart(part);
    },
  });
};