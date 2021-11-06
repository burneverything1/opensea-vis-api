const amqp = require('amqplib/callback_api')
const logger = require('../utils/logger')
require('dotenv').config()

amqp.connect(process.env.CLOUDAMQP_URL, (error0, connection) => {
    if (error0) {
        logger.error(error0)
    }

    connection.createChannel((error1, channel) => {
        if (error1) {
            logger.error(error1)
        }

        const queue = 'wikiscrape'

        channel.assertQueue(queue, {
            durable: false
        })
        logger.info('awaiting RPC requests')
        channel.consume(queue, (msg) => {
            const content = JSON.parse(msg.content)
            logger.info(content)

            const response = content.query

            channel.sendToQueue(msg.properties.replyTo,
                Buffer.from(response.toString()), {
                    correlationId: msg.properties.correlationId
                })

            channel.ack(msg)
        })
    })
})