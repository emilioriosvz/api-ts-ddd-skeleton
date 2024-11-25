export interface InMemoryConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  collections?: Map<any, any>;
}

export class InMemoryConfigFactory {
  static createConfig(): InMemoryConfig {
    return {
      collections: new Map(),
    };
  }
}
