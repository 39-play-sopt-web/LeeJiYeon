export type Part = 'WEB' | 'IOS' | 'ANDROID';

export interface AuthorizationCodeRequest {
  part: Part;
}

export interface AuthorizationCodeResponse {
  authorizationCode: string;
}