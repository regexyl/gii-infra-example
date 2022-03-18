import {
  extendType,
  inputObjectType,
  list,
  nonNull,
  objectType,
  stringArg,
} from "nexus";

export const Item = objectType({
  name: "Item",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.float("price");
  },
});

export const Menu = objectType({
  name: "Menu",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("cuisine");
    t.nonNull.list.nonNull.field("items", {
      type: "Item",
      resolve(parent, args, context) {
        return context.prisma.menu
          .findUnique({ where: { id: parent.id } })
          .items();
      },
    });
  },
});

// export const ItemListInput = inputObjectType({
//   name: 'ItemListInput',
//   definition(t) {
//     t.nonNull.string('name'), t.nonNull.float('price');
//   },
// });

// export const VendorMutation = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.nonNull.field('addMenu', {
//       type: 'Menu',
//       args: {
//         cuisine: nonNull(stringArg()),
//         items: list(nonNull(ItemListInput)),
//       },
//       async resolve(parent, args, context) {
//         const { cuisine, items } = args;
//         const { vendorId } = context;

//         if (!vendorId) {
//           throw new Error('Cannot add menu as vendor is not signed in');
//         }

//         const menu = await context.prisma.menu.create({
//           data: {
//             vendorId,
//             cuisine,
//             items: {
//               create: [{ name: 'chicken rice', price: 5 }],
//             },
//             itemId: 5, //? ???
//           },
//           include: {
//             items: true,
//           },
//         });

//         return menu;
//       },
//     });
//   },
// });
