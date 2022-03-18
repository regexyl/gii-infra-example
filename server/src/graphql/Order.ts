import {
  extendType,
  inputObjectType,
  intArg,
  list,
  nonNull,
  objectType,
} from 'nexus';
import { ItemListInput } from '.';

export const Order = objectType({
  name: 'Order',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.field('vendor', {
      type: 'Vendor',
      resolve(parents, args, context) {
        return context.prisma.order
          .findUnique({ where: { id: parents.id } })
          .vendor();
      },
    });
    t.nonNull.list.nonNull.field('items', {
      type: 'Item',
      resolve(parent, args, context) {
        return context.prisma.order
          .findUnique({ where: { id: parent.id } })
          .items();
      },
    });
  },
});

export const OrderMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createOrder', {
      type: 'Order',
      args: {
        vendorId: nonNull(intArg()),
        items: list(nonNull(ItemListInput)),
      },
      async resolve(parent, args, context) {
        const { items, vendorId } = args;

        if (!vendorId) {
          throw new Error('vendorId does not exist');
        }

        const order = await context.prisma.order.create({
          data: {
            vendorId,
            items: {
              create: items!,
              // create: [{ name: 'chicken rice', price: 5 }],
            },
          },
          include: {
            items: true,
          },
        });

        return order;
      },
    });
  },
});
