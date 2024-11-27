import { MotherCreator } from "./MotherCreator";

export class IntegerMother {
  static random(max?: number): number {
    return MotherCreator.random().number.int({ min: 0, max: max || 1000 });
  }
}
