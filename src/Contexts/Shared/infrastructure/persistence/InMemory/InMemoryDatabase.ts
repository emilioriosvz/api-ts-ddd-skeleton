import { InMemoryConfig } from "./InMemoryConfigFactory";

export class InMemoryDatabase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private collections: Map<any, any>;

  constructor(config: InMemoryConfig) {
    this.collections = config.collections || new Map();
  }

  collection(name: string) {
    if (!this.collections.has(name)) {
      this.collections.set(name, []);
    }

    return this.collections.get(name);
  }
  async save(collectionName: string, data: object) {
    const collection = this.collection(collectionName);

    collection.push(data);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async search(collectionName: string, filters: any) {
    const collection = this.collection(collectionName);
    const result = collection.filter((data: { [x: string]: unknown }) => {
      return Object.entries(filters).every(([key, value]) => {
        return data[key] === value;
      });
    });

    return result;
  }
  async update(
    collectionName: string,
    filters: { [s: string]: unknown } | ArrayLike<unknown>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
  ) {
    const collection = this.collection(collectionName);
    const elements = collection.filter((data: { [x: string]: unknown }) => {
      return Object.entries(filters).every(([key, value]) => {
        return data[key] === value;
      });
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    elements.forEach((element: any) => {
      Object.assign(element, data);
    });
  }

  async delete(
    collectionName: string,
    filters: { [s: string]: unknown } | ArrayLike<unknown>,
  ) {
    const collection = this.collection(collectionName);
    const elements = collection.filter((data: { [x: string]: unknown }) => {
      return Object.entries(filters).every(([key, value]) => {
        return data[key] === value;
      });
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    elements.forEach((element: any) => {
      const index = collection.indexOf(element);
      collection.splice(index, 1);
    });
  }
}
