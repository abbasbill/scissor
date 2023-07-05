const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

mongoose.Promise = global.Promise;

class Connection {
  constructor() {
    this.mongoServer = null;
    this.connection = null;
  }

  async connect() {
    this.mongoServer = await MongoMemoryServer.create();
    const mongoUri = this.mongoServer.getUri();

    this.connection = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async disconnect() {
    await mongoose.disconnect();
    await this.mongoServer.stop();
  }

  async cleanup() {
    const models = Object.keys(this.connection.models);
    const promises = [];

    models.map((model) => {
      promises.push(this.connection.models[model].deleteMany({}));
    });

    await Promise.all(promises);
  }
}

/**
 * Create the initial database connection.
 *
 * @async
 * @return {Promise<Object>}
 */
exports.connect = async () => {
  const connection = new Connection();
  await connection.connect();
  return connection;
};