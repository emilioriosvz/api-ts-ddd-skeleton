import { RabbitMQConnection } from "../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConnection";

import { RabbitMQqueueFormatter } from "../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQqueueFormatter";

import { ConnectionSettings } from "../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/ConnectionSettings";
import { ExchangeSetting } from "../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/ExchangeSetting";
import { DomainEventSubscribers } from "../../../Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers";
import { RabbitMQConfigurer } from "../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/ConfigureRabbitMQCommand";

export class ConfigureRabbitMQCommand {
  static async run() {
    const connectionSettings: ConnectionSettings = {
      username: process.env.RABBITMQ_USERNAME || "guest",
      password: process.env.RABBITMQ_PASSWORD || "guest",
      vhost: process.env.RABBITMQ_VHOST || "/",
      connection: {
        secure: process.env.RABBITMQ_SECURE === "false",
        hostname: process.env.RABBITMQ_HOSTNAME || "localhost",
        port: parseInt(process.env.RABBITMQ_PORT || "5672"),
      },
      // exchangeSettings: { name: "" },
    };

    const exchangeSettings: ExchangeSetting = {
      name: process.env.RABBITMQ_EXCHANGE || "domain_events",
      type: "topic",
    };

    const connection = new RabbitMQConnection({
      connectionSettings,
      exchangeSettings,
    });

    await connection.connect();

    const queueFormatter = new RabbitMQqueueFormatter(
      process.env.RABBITMQ_QUEUE_PREFIX || "backoffice",
    );

    const configurer = new RabbitMQConfigurer(connection, queueFormatter);

    const subscribers = DomainEventSubscribers.fromDomainEventSubscribers();

    await configurer.configure({
      exchange: exchangeSettings.name,
      subscribers: subscribers.items,
    });

    await connection.close();
  }
}
