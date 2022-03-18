import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { APP_SECRET } from '../utils/auth';

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.nonNull.string('token');
    t.nonNull.field('vendor', {
      type: 'Vendor',
    });
  },
});

export const AuthMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('signup', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
        const { email, name } = args;

        console.log(email, name)
        const password = await bcrypt.hash(args.password, 10);

        const vendor = await context.prisma.vendor.create({
          data: { email, name, password },
        });

        const token = jwt.sign({ vendorId: vendor.id }, APP_SECRET);

        return { token, vendor };
      },
    });

    t.nonNull.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
        const vendor = await context.prisma.vendor.findUnique({
          where: { email: args.email },
        });

        if (!vendor) {
          throw new Error('No such user found');
        }

        const valid = await bcrypt.compare(args.password, vendor.password);
        if (!valid) {
          throw new Error('Invalid password');
        }

        const token = jwt.sign({ vendorId: vendor.id }, APP_SECRET);

        return { token, vendor };
      },
    });
  },
});
