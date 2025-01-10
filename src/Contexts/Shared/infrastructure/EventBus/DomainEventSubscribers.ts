import { inMemoryDatabaseClient } from "../../../Backoffice/Shared/infrastructure/persistence/InMemory/InMemoryDatabaseClient";
import { IncrementVideosCounterOnVideoCreated } from "../../../Backoffice/VideosCounter/application/Increment/IncrementVideosCounterOnVideoCreated";
import { VideosCounterIncrementer } from "../../../Backoffice/VideosCounter/application/Increment/VideosCounterIncrementer";
import { InMemoryVideosCounterRepository } from "../../../Backoffice/VideosCounter/infrastructure/InMemoryVideosCounterRepository";
import { DomainEvent } from "../../domain/DomainEvent";
import { DomainEventSubscriber } from "../../domain/DomainEventSubscriber";
import { rabbitMQConnection } from "./RabbitMQ/RabbitMQConnection";
import { RabbitMQEventBus } from "./RabbitMQ/RabbitMQEventBus";
import { RabbitMQqueueFormatter } from "./RabbitMQ/RabbitMQqueueFormatter";

export class DomainEventSubscribers {
  public items: Array<DomainEventSubscriber<DomainEvent>>;

  private constructor(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    this.items = subscribers;
  }

  static fromDomainEventSubscribers(): DomainEventSubscribers {
    // const connection = new RabbitMQConnection({
    //   connectionSettings: {
    //     username: process.env.RABBITMQ_USERNAME || "guest",
    //     password: process.env.RABBITMQ_PASSWORD || "guest",
    //     vhost: process.env.RABBITMQ_VHOST || "/",
    //     connection: {
    //       secure: process.env.RABBITMQ_SECURE === "false",
    //       hostname: process.env.RABBITMQ_HOSTNAME || "localhost",
    //       port: parseInt(process.env.RABBITMQ_PORT || "5672"),
    //     },
    //   },
    //   exchangeSettings: {
    //     name: "domain_events",
    //   },
    // });
    const connection = rabbitMQConnection;

    const rabbitMQEventBus = new RabbitMQEventBus({
      connection,
      exchange: "domain_events",
      queueNameFormatter: new RabbitMQqueueFormatter(
        process.env.RABBITMQ_QUEUE_PREFIX || "backoffice",
      ),
    });

    const videosCounterIncrementer = new VideosCounterIncrementer(
      new InMemoryVideosCounterRepository(inMemoryDatabaseClient),
      rabbitMQEventBus,
    );

    const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [
      new IncrementVideosCounterOnVideoCreated(videosCounterIncrementer),
    ];

    return new DomainEventSubscribers(subscribers);
  }
}
