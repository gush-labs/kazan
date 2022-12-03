import { MongoClient, ServerApiVersion } from "mongodb"
import { Configuration, config } from "./Configuration";

const mongoUrl = Configuration.get(config.database.url);
const mongoUser = Configuration.get(config.database.user);
const mongoPassword = Configuration.get(config.database.password);

const uri = "mongodb+srv://" + mongoUser + ":" + mongoPassword + "@" + mongoUrl + "/?retryWrites=true&w=majority";

export class Database {

  private static mongoClient: MongoClient | undefined = undefined;

  // TODO: If there will be a connection error, we should probably reconnect again

  private static get client(): Promise<MongoClient> {
    if (this.mongoClient) {
      return Promise.resolve(this.mongoClient);
    }

    const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
    return client.connect().then(client => {
      console.log("Connected to the database");
      this.mongoClient = client;
      return client;
    });
  }

  static dbsize(): Promise<number> {
    return this.client.then(client => {
      const collection = client.db("test-db").collection("test-collection");
      return collection.countDocuments();
    });
  }

}