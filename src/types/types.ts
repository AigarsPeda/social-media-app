export type ScreamType = {
  body: string;
  commentCount: number;
  createdAt: string;
  likeCount: number;
  screamId: string;
  userHandle: string;
  userImage: string;
  comments: ScreamComment[];
};

export type ErrorsType = {
  general?: string;
  password?: string;
  email?: string;
  handle?: string;
  confirmPassword?: string;
  body?: string;
  comment?: string;
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

export type SignUserType = {
  email: string;
  password: string;
  confirmPassword: string;
  handle: string;
};

export type UserDataType = {
  credentials: UserCredentialsType;
  likes: {
    userHandle: string;
    screamId: string;
  }[];
  notifications: {
    recipient: string;
    sender: string;
    createdAt: string;
    screamId: string;
    type: "comment" | "like" | "";
    read: boolean;
    notificationId: string;
  }[];
};

export type UserCredentialsType = {
  bio: string;
  createdAt: string;
  email: string;
  handle: string;
  imageUrl: string;
  location: string;
  userId: string;
  website: string;
};

export type UserDetailsType = {
  bio: string;
  website: string;
  location: string;
};

export type ScreamComment = {
  body: string;
  createdAt: string;
  screamId: string;
  userHandle: string;
  userImage: string;
};
