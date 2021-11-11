const amqp = require('amqplib/callback_api')
const logger = require('../utils/logger')
require('dotenv').config()

const 
amqp.connect(process.env.CLOUDAMQP_URL, (error0, connection) => {
    if (error0) {
        logger.error(error0)
    }

    connection.createChannel((error1, channel) => {
        if (error1) {
            logger.error(error1)
        }
        const queue = 'nft'

        channel.assertQueue(queue, {
            durable: false
        }, (error2) => {        // callback after assert
            if (error2) {
                logger.error(error2)
            }

            const correlationId = generateUUid()
            const send_msg = {
                "address": "0xF8C08433DD41eAeE2e424C9E91467aB27772d9ec"
            }

            logger.info('requesting')

            channel.consume(queue, (msg) => {
                if (msg.properties.correlationId == correlationId) {
                    const msg_content = JSON.parse(JSON.parse(msg.content).contract)
                    logger.info(msg_content)

                    setTimeout(() => {
                        connection.close()
                        process.exit(0)
                    }, 500)
                }
            }, {
                noAck: true
            })

            channel.sendToQueue(queue,
                Buffer.from(JSON.stringify(send_msg)), {
                    contentType: 'application/json',
                    correlationId: correlationId,
                    replyTo: queue
                })
        })
    })
})

const generateUUid = () => {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString()
}