const { version } = require('../package.json');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'titly API documentation, An Application for Url shortening',
    version,
    license: {
      name: 'MIT',
      url: '',
    },
  },
  servers: [
    {
      url: `https://titly.onrender.com`,
      description: 'production server',

    },
    {
      url: `https://localhost:${process.env.PORT}`,
      description: 'developmentserver server',

    },
  ],
};

module.exports = swaggerDef;
