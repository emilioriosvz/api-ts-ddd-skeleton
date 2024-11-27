import { UuidMother } from "../../Shared/domain/UuidMother";

export class VideoIdMother {
  static create(value: string): string {
    return value; // TODO: use a  videoId value object
  }
  static random(): string {
    return this.create(UuidMother.random());
  }
}
