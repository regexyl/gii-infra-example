module.exports = {
  projects: {
    app: {
      schema: ['server/schema.graphql'],
      documents: ['**/*.{graphql,js,ts,jsx,tsx}'],
      extensions: {
        endpoints: {
          default: {
            url: 'http://localhost:3001',
          },
        },
      },
    },
  },
};
