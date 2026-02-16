import { StringValue } from 'ms';

export const jwtSecret = process.env.JWT_SECRET ?? 'dev-secret-change-me';

export const jwtExpiresIn: StringValue | number =
  (process.env.JWT_EXPIRES_IN as StringValue | undefined) ?? '1d';
