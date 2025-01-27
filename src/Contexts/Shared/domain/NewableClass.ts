// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export interface NewableClass<T> extends Function {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
}
