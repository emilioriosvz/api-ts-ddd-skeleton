import { InMemoryDatabaseClient } from "../../../../Backoffice/Shared/infrastructure/persistence/InMemory/InMemoryDatabaseClient";
import { DomainEvent } from "../../../domain/DomainEvent";
import { DomainEventDeserializer } from "../DomainEventDeserializer";
import { DomainEventJsonSerializer } from "../DomainEventJsonSerializer";

export class DomainEventFailoverPublisher {
  static collectionName = "DomainEvents";

  constructor(
    private databaseClient: InMemoryDatabaseClient,
    private deserializer: DomainEventDeserializer,
  ) {}

  async publish(event: DomainEvent): Promise<void> {
    const eventSerialized = DomainEventJsonSerializer.serialize(event);
    const filter = { eventId: event.eventId };
    const update = { eventId: event.eventId, event: eventSerialized };

    await this.databaseClient.update(
      DomainEventFailoverPublisher.collectionName,
      filter,
      update,
    );
  }

  async consume(): Promise<Array<DomainEvent>> {
    const documents = await this.databaseClient.search(
      DomainEventFailoverPublisher.collectionName,
      {},
    );

    const events = documents.map((document) => {
      const domainEventDocument = document as DomainEvent;
      return this.deserializer.deserialize(domainEventDocument.eventName);
    });

    return events.filter(Boolean) as Array<DomainEvent>;
  }
}
