import { RabbitMQConnection } from "../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQEventBus";
import { VideosCounterIncrementedDomainEventMother } from "../../../Backoffice/VideosCounter/domain/VideosCounterIncrementedDomainEventMother";

describe("RabbitMQEventBus test", () => {
  const config = {
    connectionSettings: {
      username: "guest",
      password: "guest",
      vhost: "/",
      connection: {
        secure: false,
        hostname: "localhost",
        port: 5672,
      },
    },
    exchangeSettings: { name: "" },
  };

  let connection: RabbitMQConnection;

  beforeAll(async () => {
    connection = new RabbitMQConnection(config);
    await connection.connect();
  });

  afterAll(async () => {
    await connection.close();
  });

  it("should publish events to RabbitMQ", async () => {
    const eventBus = new RabbitMQEventBus({ connection });

    await eventBus.publish([
      VideosCounterIncrementedDomainEventMother.create(),
    ]);
  });
});
