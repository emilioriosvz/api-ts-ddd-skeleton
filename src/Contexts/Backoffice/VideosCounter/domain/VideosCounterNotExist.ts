export class VideosCounterNotExist extends Error {
  constructor() {
    super("The videos counter does not exists");
  }
}
