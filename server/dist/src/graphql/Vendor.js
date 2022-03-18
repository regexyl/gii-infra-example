"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorQuery = exports.Vendors = exports.Vendor = void 0;
const nexus_1 = require("nexus");
exports.Vendor = (0, nexus_1.objectType)({
  name: "Vendor",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("email");
    t.nonNull.string("name");
    t.nonNull.float("balance");
    t.field("menu", {
      type: "Menu",
      resolve(parent, args, context) {
        return context.prisma.vendor
          .findUnique({ where: { id: parent.id } })
          .menu();
      },
    });
  },
});
exports.Vendors = (0, nexus_1.objectType)({
  name: "Vendors",
  definition(t) {
    t.nonNull.list.nonNull.field("vendors", { type: exports.Vendor });
    t.nonNull.int("count");
  },
});
exports.VendorQuery = (0, nexus_1.extendType)({
  type: "Query",
  definition(t) {
    t.field("vendor", {
      type: "Vendor",
      args: {
        email: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
      },
      resolve(parent, args, context) {
        return context.prisma.vendor.findUnique({
          where: { email: args.email },
        });
      },
    });
    t.nonNull.field("vendorsList", {
      type: "Vendors",
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
//# sourceMappingURL=Vendor.js.map
