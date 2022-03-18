import * as jwt from 'jsonwebtoken';

export const APP_SECRET = 'asAGjfasoW123hD0ng1';

export interface AuthTokenPayload {
  vendorId: number;
}

export function decodeAuthHeader(authHeader: String): AuthTokenPayload {
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    throw new Error('No token found');
  }
  return jwt.verify(token, APP_SECRET) as AuthTokenPayload;
}
