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
