import { VideosCounter } from "../../../../../src/Contexts/Backoffice/VideosCounter/domain/VideosCounter";
import { VideosCounterId } from "../../../../../src/Contexts/Backoffice/VideosCounter/domain/VideosCounterId";
import { VideosCounterTotal } from "../../../../../src/Contexts/Backoffice/VideosCounter/domain/VideosCounterTotal";
import { Repeater } from "../../Shared/domain/Repeater";
import { VideosCounterTotalMother } from "./VideosCounterTotalMother";

export class VideosCounterMother {
  static random() {
    const total = VideosCounterTotalMother.random();
    const uuidGenerator = () => "670cafc3-037f-4a1b-ae1f-cc186cf5c6d6";

    return new VideosCounter(
      VideosCounterId.random(),
      total,
      Repeater.random(uuidGenerator, total.value),
    );
  }

  static withOne(videoId: string) {
    return new VideosCounter(
      VideosCounterId.random(),
      new VideosCounterTotal(1),
      [videoId],
    );
  }
}
