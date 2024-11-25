import { NumberValueObject } from "../../../Shared/domain/value-object/IntValueObject";

export class VideosCounterTotal extends NumberValueObject {
  increment(): VideosCounterTotal {
    return new VideosCounterTotal(this.value + 1);
  }

  static initialize(): VideosCounterTotal {
    return new VideosCounterTotal(0);
  }
}
