"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const apollo_server_1 = require("apollo-server");
const apollo_server_core_1 = require("apollo-server-core");
const context_1 = require("./context");
const schema_1 = require("./schema");
exports.server = new apollo_server_1.ApolloServer({
  schema: schema_1.schema,
  context: context_1.context,
  introspection: true,
  plugins: [
    (0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)(),
  ],
});
const port = process.env.PORT || 3001;
exports.server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map
