const amqp = require('amqplib/callback_api')
const logger = require('../utils/logger')
require('dotenv').config()

amqp.connect(process.env.CLOUDAMQP_URL, (error0, connection) => {
    if (error0) {
        logger.error(error0)
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            logger.error(error0)
        }
        const queue = 'wikiscrape'

        channel.assertQueue(queue, {
            durable: false
        });

        logger.info(`Waiting for messages in ${queue}. To exit press CTRL+C`)

        channel.consume(queue, (msg) => {
            logger.info(`Received ${msg.content.toString()}`)
        }, {
            noAck: true
        })
  });
});