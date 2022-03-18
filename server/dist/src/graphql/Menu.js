"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemListInput = exports.Menu = exports.Item = void 0;
const nexus_1 = require("nexus");
exports.Item = (0, nexus_1.objectType)({
  name: "Item",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.float("price");
  },
});
exports.Menu = (0, nexus_1.objectType)({
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
exports.ItemListInput = (0, nexus_1.inputObjectType)({
  name: "ItemListInput",
  definition(t) {
    t.nonNull.string("name"), t.nonNull.float("price");
  },
});
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
//# sourceMappingURL=Menu.js.map
