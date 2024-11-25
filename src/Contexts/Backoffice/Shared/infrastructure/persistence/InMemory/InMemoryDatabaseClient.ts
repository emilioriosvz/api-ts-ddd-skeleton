import { InMemoryDatabaseClientFactory } from "../../../../../Shared/infrastructure/persistence/InMemory/InMemoryDatabaseFactory";
import { InMemoryConfigFactory } from "../../../../../Shared/infrastructure/persistence/InMemory/InMemoryConfigFactory";
import { InMemoryDatabase } from "../../../../../Shared/infrastructure/persistence/InMemory/InMemoryDatabase";

export class InMemoryDatabaseClient {
  private database: InMemoryDatabase;

  constructor() {
    const config = InMemoryConfigFactory.createConfig();
    this.database = InMemoryDatabaseClientFactory.createClient(config);
  }

  async save(collectionName: string, data: object): Promise<void> {
    return this.database.save(collectionName, data);
  }

  async search(
    collectionName: string,
    filters: object,
  ): Promise<Array<unknown>> {
    return this.database.search(collectionName, filters);
  }

  async update(
    collectionName: string,
    filters: { [s: string]: unknown } | ArrayLike<unknown>,
    data: object,
  ): Promise<void> {
    return this.database.update(collectionName, filters, data);
  }

  async delete(
    collectionName: string,
    filters: { [s: string]: unknown } | ArrayLike<unknown>,
  ): Promise<void> {
    return this.database.delete(collectionName, filters);
  }
}

export const inMemoryDatabaseClient = new InMemoryDatabaseClient();
