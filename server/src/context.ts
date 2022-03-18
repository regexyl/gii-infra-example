import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { decodeAuthHeader } from './utils/auth';

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  vendorId?: number;
}

export const context = ({ req }: { req: Request }): Context => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null;
      
  return { prisma, vendorId: token?.vendorId };
};
