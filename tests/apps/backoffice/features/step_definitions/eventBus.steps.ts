import { EventBus } from "../../../../../src/Contexts/Shared/domain/EventBus";
import { DomainEventDeserializer } from "../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventDeserializer";
import { InMemoryAsyncEventBus } from "../../../../../src/Contexts/Shared/infrastructure/EventBus/InMemory/InMemoryAsyncEventBus";
import { DomainEventSubscribers } from "../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers";
import { Given } from "@cucumber/cucumber";

const eventBus = new InMemoryAsyncEventBus() as EventBus;
const deserializer = buildDeserializer();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Given("I send an event to the event bus:", async (event: any) => {
  const domainEvent = deserializer.deserialize(event);

  await eventBus.publish([domainEvent!]);
  await wait(100); // it's an async operation
});

function buildDeserializer() {
  // Crea una instancia de DomainEventSubscribers con tus suscriptores
  const domainEventSubscribers =
    DomainEventSubscribers.fromDomainEventSubscribers();

  // Pasa la instancia de DomainEventSubscribers al configurar el deserializador
  return DomainEventDeserializer.configure(domainEventSubscribers);
}

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
