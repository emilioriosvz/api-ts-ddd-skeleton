import { VideosCounter } from "./VideosCounter";
import { Nullable } from "../../../Shared/domain/Nullable";

export interface VideosCounterRepository {
  search(): Promise<Nullable<VideosCounter>>;
  save(counter: VideosCounter): Promise<void>;
}
