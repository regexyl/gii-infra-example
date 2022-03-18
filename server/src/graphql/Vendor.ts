import { extendType, nonNull, objectType, stringArg } from 'nexus';

export const Vendor = objectType({
  name: 'Vendor',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('email');
    t.nonNull.string('name');
    t.nonNull.float('balance');
    t.field('menu', {
      type: 'Menu',
      resolve(parent, args, context) {
        return context.prisma.vendor
          .findUnique({ where: { id: parent.id } })
          .menu();
      },
    });
  },
});

export const Vendors = objectType({
  name: 'Vendors',
  definition(t) {
    t.nonNull.list.nonNull.field('vendors', { type: Vendor });
    t.nonNull.int('count');
  },
});

export const VendorQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('vendor', {
      type: 'Vendor',
      args: {
        email: nonNull(stringArg()),
      },
      resolve(parent, args, context) {
        return context.prisma.vendor.findUnique({
          where: { email: args.email },
        });
      },
    });
    t.nonNull.field('vendorsList', {
      type: 'Vendors',
      async resolve(parent, args, context, info) {
        const vendors = await context.prisma.vendor.findMany();
        const count = await context.prisma.vendor.count();

        return {
          vendors,
          count,
        };
      },
    });
  },
});
