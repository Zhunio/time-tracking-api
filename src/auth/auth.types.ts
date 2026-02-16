export type JwtPayload = {
  sub: string;
  email: string;
  isAdmin: boolean;
};

export type AuthenticatedRequestUser = {
  id: string;
  email: string;
  isAdmin: boolean;
};
