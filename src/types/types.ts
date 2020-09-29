export type ScreamType = {
  body: string;
  commentCount: number;
  createdAt: string;
  likeCount: number;
  screamId: string;
  userHandle: string;
  userImage: string;
};

export type ErrorsType = {
  general?: string;
  password?: string;
  email?: string;
  handel?: string;
  confirmPassword?: string;
};

export type TokenType = {
  aud: string;
  auth_time: number;
  email: string;
  email_verified: boolean;
  exp: number;
  firebase: {
    identities: {
      email: string[];
    };
    sign_in_provider: string;
  };
  iat: number;
  iss: string;
  sub: string;
  user_id: string;
};

export type LoginUserType = {
  email: string;
  password: string;
};
