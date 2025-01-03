import amqplib, { ConsumeMessage } from "amqplib";
import { ConnectionSettings } from "./ConnectionSettings";
import { ExchangeSetting } from "./ExchangeSetting";

export class RabbitMQConnection {
  protected connectionSettings: ConnectionSettings;

  protected channel?: amqplib.ConfirmChannel;
  protected connection?: amqplib.Connection;
  protected isConnected: boolean = false;

  constructor(params: {
    connectionSettings: ConnectionSettings;
    exchangeSettings: ExchangeSetting;
  }) {
    this.connectionSettings = params.connectionSettings;
  }

  async connect() {
    if (this.isConnected) return;
    this.connection = await this.amqpConnect();
    this.channel = await this.amqpChannel();
    this.isConnected = true;
  }

  async exchange(params: { name: string }) {
    return await this.channel?.assertExchange(params.name, "topic", {
      durable: true,
    });
  }

  async queue(params: {
    exchange: string;
    name: string;
    routingKeys: string[];
  }) {
    const durable = true;
    const exclusive = false;
    const autoDelete = false;

    await this.channel?.assertQueue(params.name, {
      exclusive,
      durable,
      autoDelete,
    });
    for (const routingKey of params.routingKeys) {
      await this.channel!.bindQueue(params.name, params.exchange, routingKey);
    }
  }

  async deleteQueue(queue: string) {
    return await this.channel!.deleteQueue(queue);
  }

  private async amqpConnect() {
    const { hostname, port, secure } = this.connectionSettings.connection;
    const { username, password, vhost } = this.connectionSettings;
    const protocol = secure ? "amqps" : "amqp";

    const connection = await amqplib.connect({
      protocol,
      hostname,
      port,
      username,
      password,
      vhost,
    });

    connection.on("error", (err: Error) => {
      Promise.reject(err);
    });

    return connection;
  }

  private async amqpChannel(): Promise<amqplib.ConfirmChannel> {
    const channel = await this.connection!.createConfirmChannel();
    await channel.prefetch(1);

    return channel;
  }

  async publish(params: {
    exchange: string;
    routingKey: string;
    content: Buffer;
    options: {
      messageId: string;
      contentType: string;
      contentEncoding: string;
    };
  }) {
    const { routingKey, content, options, exchange } = params;
    return new Promise<void>(
      (
        resolve: (value?: void | PromiseLike<void>) => void,
        reject: (reason?: Error) => void,
      ) => {
        this.channel!.publish(
          exchange,
          routingKey,
          content,
          options,
          (error: Error) => (error ? reject(error) : resolve()),
        );
      },
    );
  }

  async close() {
    await this.channel?.close();
    return await this.connection?.close();
  }

  async consume(
    queue: string,
    onMessage: (message: ConsumeMessage) => unknown,
  ) {
    console.log("palmazo");

    await this.channel!.consume(queue, (message: ConsumeMessage | null) => {
      if (!message) {
        return;
      }
      onMessage(message);
    });
  }

  ack(message: ConsumeMessage) {
    this.channel!.ack(message);
  }

  noAck(message: ConsumeMessage) {
    this.channel!.nack(message);
  }
}

const connectionSettings: ConnectionSettings = {
  username: process.env.RABBITMQ_USERNAME || "guest",
  password: process.env.RABBITMQ_PASSWORD || "guest",
  vhost: process.env.RABBITMQ_VHOST || "/",
  connection: {
    hostname: process.env.RABBITMQ_HOSTNAME || "localhost",
    port: parseInt(process.env.RABBITMQ_PORT || "5672", 10),
    secure: process.env.RABBITMQ_SECURE === "true",
  },
};

const exchangeSettings: ExchangeSetting = {
  name: process.env.RABBITMQ_EXCHANGE_NAME || "domain_events",
  type: "topic",
};

export const rabbitMQConnection = new RabbitMQConnection({
  connectionSettings,
  exchangeSettings,
});
