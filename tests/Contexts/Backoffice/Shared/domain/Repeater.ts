import { IntegerMother } from "./IntegerMother";
export class Repeater {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  static random(callable: Function, iterations: number) {
    return Array(iterations || IntegerMother.random(20))
      .fill({})
      .map(() => callable());
  }
}
