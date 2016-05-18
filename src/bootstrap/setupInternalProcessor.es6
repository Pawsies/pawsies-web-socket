import _ from 'lodash';
import hermes from 'runnable-hermes';

export default async function (sm) {

    let service = hermes.hermesSingletonFactory({
        name: 'pawsies',
        hostname: process.env.RABBITMQ_HOST || 'localhost',
        port: process.env.RABBITMQ_PORT || '5672',
        username: process.env.RABBITMQ_USERNAME || 'guest',
        password: process.env.RABBITMQ_PASSWORD || 'guest',
        queues: [ 'pawsies-rtm-gateway-request' ]
    });

    service.connect().on('ready', () => {

        console.log('connected to RabbitMQ');

        service.on('subscribe', (queueName, handlerFn) => console.log('subscribed to', queueName));

        service.on('publish', (queueName, data) => console.log('response emmited', queueName, data));

        service.subscribe('pawsies-rtm-gateway-request', (request, done) => {

            console.log('request received', 'pawsies-rtm-gateway-request', request);

            if (request.type === "SERVER_PUSH") {

                sm.send(request.deviceId, request.payload);

            }

            done();

        });

    });



}
