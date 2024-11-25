import { InMemoryDatabase } from "./InMemoryDatabase";
import { InMemoryConfig } from "./InMemoryConfigFactory";

export class InMemoryDatabaseClientFactory {
  static createClient(config: InMemoryConfig): InMemoryDatabase {
    try {
      return new InMemoryDatabase(config);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error(String(error));
    }
  }
}
