import { VideosCounterTotal } from "../../../../../src/Contexts/Backoffice/VideosCounter/domain/VideosCounterTotal";
import { IntegerMother } from "../../Shared/domain/IntegerMother";

export class VideosCounterTotalMother {
  static random() {
    return new VideosCounterTotal(IntegerMother.random());
  }
}
